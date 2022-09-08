import { container } from 'tsyringe';
import {
  SignUpDTO,
  SignUpOutputDTO,
} from '@/application/authentication/dtos/sign-up.dto';
import { SignUpUseCase } from '@/application/authentication/sign-up.use-case';
import { SignUpJoiSchema } from './validations/sign-up.validation';
import { Request, Response, NextFunction } from 'express';

export class SignUpController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<SignUpOutputDTO>> {
    try {
      await SignUpJoiSchema.validate(req.body);
      const { name, email, password } = req.body as SignUpDTO;

      const usecase = container.resolve(SignUpUseCase);

      const { user, accessToken, refreshToken, refreshTokenExp } =
        await usecase.execute({
          name,
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
