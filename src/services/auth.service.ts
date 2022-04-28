import { AppDataSource } from "../database";
import { User } from "../models/User";

import { compare, hash } from "bcryptjs";
import { decode, JwtPayload, sign, verify } from "jsonwebtoken";
import {
  IRefreshTokenDTO,
  ISignInDTO,
  ISignUpDTO,
} from "../models/dto/auth.dto";
import AppError from "../errors/AppError";

import { StreamService } from "../services/stream.service";
import { Token } from "../models/Token";

function generateTokens(user_id: string) {
  const accessToken = sign({}, process.env.JWT_SECRET, {
    subject: user_id,
    expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
  });

  const refreshToken = sign({}, process.env.JWT_SECRET, {
    subject: user_id,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  });

  return { accessToken, refreshToken };
}

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

    const { accessToken, refreshToken } = generateTokens(user.id);
    const refreshTokenExp = decode(refreshToken) as JwtPayload;

    delete user.password;

    return {
      user,
      accessToken,
      refreshToken,
      refreshTokenExp: refreshTokenExp.exp
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

    const { accessToken, refreshToken } = generateTokens(user.id);
    const refreshTokenExp = decode(refreshToken) as JwtPayload;

    await StreamService.createRelationWithUser(savedUser);

    delete user.password;

    return {
      user,
      accessToken,
      refreshToken,
      refreshTokenExp: refreshTokenExp.exp
    };
  }

  static async refreshToken({
    accessToken,
    refreshToken,
  }: IRefreshTokenDTO) {
    const userRepository = AppDataSource.getRepository(User);

    try {
      const { sub } = verify(refreshToken, process.env.JWT_SECRET);
      const userExists = await userRepository.findOneBy({
        id: sub.toString(),
      });
  
      if (!userExists) {
        throw new AppError("Invalid refresh token.", 401);
      }

      const tokenRepository = AppDataSource.getRepository(Token);
      const refreshTokenIsBlackListed = await tokenRepository.findOneBy({ hash: refreshToken });
      if (refreshTokenIsBlackListed) {
        throw new AppError("Invalid refresh token", 401);
      }

      await tokenRepository.save({ hash: accessToken }); //revoke old access token

      const { accessToken: newAccessToken } = generateTokens(userExists.id);

      return newAccessToken;
    } catch (error) {
      throw new AppError("Invalid refresh token.", 401);
    }
  }

  static async revokeTokens({ accessToken, refreshToken }: IRefreshTokenDTO) {
    const tokenRepository = AppDataSource.getRepository(Token);
    await tokenRepository.save({ hash: accessToken });
    await tokenRepository.save({ hash: refreshToken });
  }
}
