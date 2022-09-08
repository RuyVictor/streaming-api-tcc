import { container } from 'tsyringe';
import {
  SignInDTO,
  SignInOutputDTO,
} from '@/application/authentication/dtos/sign-in.dto';
import { SignInUseCase } from '@/application/authentication/sign-in.use-case';
import { SignInJoiSchema } from './validations/sign-in.validation';
import { Request, Response, NextFunction } from 'express';

export class SignInController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<SignInOutputDTO>> {
    try {
      await SignInJoiSchema.validate(req.body);
      const { email, password } = req.body as SignInDTO;

      const usecase = container.resolve(SignInUseCase);

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
