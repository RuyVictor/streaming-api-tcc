import { NextFunction, Request, Response } from "express";
import { ISignInDTO, ISignUpDTO } from "../models/dto/auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as ISignInDTO;

    try {
      const { user, token } = await AuthService.signIn({email, password});
      return res.status(200).json({ user, token });
    } catch (err) {
      next(err)
    }
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body as ISignUpDTO;
    try {
      const { user, token } = await AuthService.signUp({name, email, password});
      return res.status(200).json({ user, token });
    } catch (err) {
      next(err)
    }
  }
}
