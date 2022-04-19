import { NextFunction, Request, Response } from "express";
import { IEditStreamDTO, IStreamSearchDTO } from "../models/dto/stream.dto";
import { StreamService } from "../services/stream.service";

export class StreamController {
  static async getStreams(req: Request, res: Response, next: NextFunction) {
    const { query, status, category, page, take } =
      req.query as unknown as IStreamSearchDTO;

    try {
      const [result, total] = await StreamService.getStreams({
        query,
        status,
        category,
        page,
        take,
      });
      return res.status(200).json({ data: result, total: total });
    } catch (err) {
      next(err);
    }
  }

  static async getOneStream(req: Request, res: Response, next: NextFunction) {
    const { stream_host } = req.query;
    try {
      const stream = await StreamService.getOneStream(stream_host as string);
      return res.status(200).send(stream);
    } catch (err) {
      next(err);
    }
  }

  static async editStream(req: Request, res: Response, next: NextFunction) {

    const { title, description, category, userId } = req.body as IEditStreamDTO;
    try {
      const stream = await StreamService.editStream({
        title,
        description,
        category,
        userId
      });
      return res.status(200).send(stream);
    } catch (err) {
      next(err);
    }
  }
}
