import { container } from 'tsyringe';
import {
  RefreshTokenDTO,
  RefreshTokenOutputDTO,
} from '@/application/authentication/dtos/refresh-token.dto';
import { RefreshTokenUseCase } from '@/application/authentication/refresh-token.use-case';
import { RefreshTokenJoiSchema } from './validations/refresh-token.validation';
import { Request, Response, NextFunction } from 'express';

export class RefreshTokenController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<RefreshTokenOutputDTO>> {
    try {
      await RefreshTokenJoiSchema.validate(req.body);
      // userId & accessToken from middleware
      const { accessToken, refreshToken } = req.body as RefreshTokenDTO;

      const usecase = container.resolve(RefreshTokenUseCase);

      const newAccessToken = await usecase.execute({
        accessToken,
        refreshToken,
      });
      return res.status(200).json(newAccessToken);
    } catch (err) {
      next(err);
    }
  }
}
