import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService.signIn(email, password);
      return res.status(200).json({ user, token });
    } catch (e) {
      console.log(e.message)
      return res
        .status(400)
        .json({ message: e.message });
    }
  }
}
