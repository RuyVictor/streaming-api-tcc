import { AppDataSource } from "../database";
import { User } from "../models/User";

import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ISignInDTO, ISignUpDTO } from "../models/dto/auth.dto";
import { AppError } from "../errors/AppError";

import { StreamService } from "../services/stream.service";

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
      expiresIn: "7d",
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
      expiresIn: "7d",
    });

	await StreamService.createStream(savedUser);

    return {
      user,
      token,
    };
  }
}
