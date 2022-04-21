import { NextFunction, Request, Response } from "express";
import {
  IRefreshTokenDTO,
  ISignInDTO,
  ISignUpDTO,
} from "../models/dto/auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as ISignInDTO;

    try {
      const { user, accessToken, refreshToken } = await AuthService.signIn({
        email,
        password,
      });
      return res.status(200).json({ user, accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body as ISignUpDTO;
    try {
      const { user, accessToken, refreshToken } = await AuthService.signUp({
        name,
        email,
        password,
      });
      return res.status(200).json({ user, accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    // userId & accessToken from middleware
    const { accessToken, refreshToken } = req.body as IRefreshTokenDTO;
    try {
      const newAccessToken = await AuthService.refreshToken({
        accessToken,
        refreshToken,
      });
      return res.status(200).json({ newAccessToken });
    } catch (err) {
      next(err);
    }
  }

  static async revokeTokens(req: Request, res: Response, next: NextFunction) {
    // accessToken from middleware, refreshToken sent by user from body
    const { accessToken, refreshToken } = req.body as IRefreshTokenDTO;
    try {
      await AuthService.revokeTokens({
        accessToken,
        refreshToken,
      });
      return res.status(200).json({ message: "Tokens revoked!" });
    } catch (err) {
      next(err);
    }
  }
}
