import { container } from 'tsyringe';
import {
  RevokeTokenDTO,
  RevokeTokenOutputDTO,
} from '@/application/authentication/dtos/revoke-token.dto';
import { RevokeTokenUseCase } from '@/application/authentication/revoke-token.use-case';
import { RevokeTokenJoiSchema } from './validations/revoke-token.validation';
import { Request, Response, NextFunction } from 'express';

export class RevokeTokenController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<RevokeTokenOutputDTO>> {
    try {
      await RevokeTokenJoiSchema.validate(req.body);
      // accessToken from middleware, refreshToken sent by user from body
      const { accessToken, refreshToken } = req.body as RevokeTokenDTO;

      const usecase = container.resolve(RevokeTokenUseCase);

      await usecase.execute({
        accessToken,
        refreshToken,
      });
      return res.status(200).json({ message: 'Tokens revoked!' });
    } catch (err) {
      next(err);
    }
  }
}
