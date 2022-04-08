import { Request, Response } from "express";
import { StreamService } from "../services/stream.service";

export class StreamController {
  static async getStreams(req: Request, res: Response) {
    try {
      const streams = await StreamService.getStreams();
      return res.status(200).send(streams);
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Error while requesting streams" });
    }
  }
}
