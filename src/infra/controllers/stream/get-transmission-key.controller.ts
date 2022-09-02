import { container } from 'tsyringe';
import {
  GetTransmissionKeyDTO,
  GetTransmissionKeyOutputDTO,
} from '@/application/stream/dtos/get-transmission-key.dto';
import { GetTransmissionKeyUseCase } from '@/application/stream/get-transmission-key.use-case';
import { Request, Response, NextFunction } from 'express';

export class GetTransmissionKeyController {
  static async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<GetTransmissionKeyOutputDTO>> {
    const { userId } = req.body as unknown as GetTransmissionKeyDTO;

    const usecase = container.resolve(GetTransmissionKeyUseCase);

    try {
      const transmission_key = await usecase.execute({ userId });
      return res.status(200).json(transmission_key);
    } catch (err) {
      next(err);
    }
  }
}
