import { container } from 'tsyringe';
import {
  SignInDTO,
  SignInOutputDTO,
} from '@/application/authentication/dtos/sign-in.dto';
import { SignInUseCase } from '@/application/authentication/sign-in.use-case';
import { Request, Response, NextFunction } from 'express';

export class SignInController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<SignInOutputDTO>> {
    const { email, password } = req.body as SignInDTO;

    const usecase = container.resolve(SignInUseCase);

    try {
      const { user, accessToken, refreshToken, refreshTokenExp } =
        await usecase.execute({
          email,
          password,
        });
      return res
        .status(200)
        .json({ user, accessToken, refreshToken, refreshTokenExp });
    } catch (err) {
      next(err);
    }
  }
}
