import { AppDataSource } from "../database";
import { User } from "../models/User";

import { compare, hash } from "bcryptjs";
import { sign, decode } from "jsonwebtoken";
import {
  IRefreshTokenDTO,
  ISignInDTO,
  ISignUpDTO,
} from "../models/dto/auth.dto";
import { AppError } from "../errors/AppError";

import { StreamService } from "../services/stream.service";
import { Token } from "../models/Token";

export class AuthService {
  static async signIn({ email, password }: ISignInDTO) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .addSelect("user.password")
      .getOne();

    if (!user) {
      throw new AppError("User not Found", 404);
    }

    const passwordMathed = await compare(password, user.password);

    if (!passwordMathed) {
      throw new AppError("Incorrect email/password combination.", 403);
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    return {
      user,
      token,
    };
  }

  static async signUp({ name, email, password }: ISignUpDTO) {
    const userRepository = AppDataSource.getRepository(User);

    const checkUserEmailExists = await userRepository.findOneBy({
      email: email,
    });

    if (checkUserEmailExists) {
      throw new AppError("Email address already used.", 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await userRepository.save(user);

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    await StreamService.createStream(savedUser);

    return {
      user,
      token,
    };
  }

  static async refreshToken({ user_id, token }: IRefreshTokenDTO) {
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOneBy({
      id: user_id,
    });

    if (!userExists) {
      throw new AppError("Invalid token.", 401);
    }

    const tokenRepository = AppDataSource.getRepository(Token);
    await tokenRepository.save({ hash: token }); //revoke old token

    const accessToken = sign({}, process.env.JWT_SECRET, {
      subject: userExists.id,
      expiresIn: 120, // 2 minutes
    });

    const refreshToken = sign({}, process.env.JWT_SECRET, {
      subject: userExists.id,
      expiresIn: "6h",
    });

    return { accessToken, refreshToken };
  }

  static async revokeToken() {}
}
