import { NextFunction, Request, Response } from "express";
import { StreamService } from "../services/stream.service";

export class StreamController {
  static async getStreams(req: Request, res: Response, next: NextFunction) {
    try {
      const streams = await StreamService.getStreams();
      return res.status(200).send(streams);
    } catch (err) {
      next(err)
    }
  }
}
