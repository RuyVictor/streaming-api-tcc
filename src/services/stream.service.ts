import { Brackets, ILike } from "typeorm";
import { AppDataSource } from "../database";
import { AppError } from "../errors/AppError";
import { IStreamSearchDTO } from "../models/dto/stream.dto";
import { Stream } from "../models/Stream";
import { User } from "../models/User";
import { generateTransmissionKey } from "../utils/generateTransmissionKey";

export class StreamService {
  static async createRelationWithUser(savedUser: User) {
    const streamRepository = AppDataSource.getRepository(Stream);

    const stream = streamRepository.create({
      user: savedUser,
      transmission_key: generateTransmissionKey(20),
    });

    return await streamRepository.save(stream);
  }

  static async getStreams({
    query,
    status = "active",
    category,
    page = 1,
    take = 20,
  }: IStreamSearchDTO) {
    const streamRepository = AppDataSource.getRepository(Stream);

    const [result, total] = await streamRepository
      .createQueryBuilder("streams")
      .leftJoinAndSelect("streams.category", "category")
      .leftJoinAndSelect("streams.user", "user")
      .where("streams.status = :status", { status })
      .andWhere(
        new Brackets((qb) => {
          query &&
            qb.where("streams.title LIKE :query", { query: `%${query}%` });
          query &&
            qb.orWhere("user.name LIKE :query", { query: `%${query}%` });
          category && qb.andWhere("category.name = :name", { name: category });
        })
      )
      .orderBy("streams.spectators", "DESC")
      .skip((page - 1) * take)
      .take(take)
      .getManyAndCount();

    if (!result) {
      throw new AppError("Stream not found.", 404);
    }

    return [result, total];
  }

  static async getOneStream(stream_host: string): Promise<Stream> {
    const streamRepository = AppDataSource.getRepository(Stream);

    const foundStream = await streamRepository.findOne({
      where: {user: {name: stream_host}},
      relations: ['category', 'user']
    });

    if (!foundStream) {
      throw new AppError("Stream host not found.", 404);
    }

    return foundStream;
  }
}
