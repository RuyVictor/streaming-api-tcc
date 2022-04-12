import { IPagination } from '../common/interfaces/Pagination';
import { AppDataSource } from '../database';
import { Stream } from '../models/Stream';
import { User } from '../models/User';

export class StreamService {
    static async createStream(savedUser: User) {
        const streamRepository = AppDataSource.getRepository(Stream)

        const stream = streamRepository.create({
            user: savedUser
        });

        return await streamRepository.save(stream);
    }

    static async getStreams(pagination?: IPagination): Promise<Stream[]> {
        const streamRepository = AppDataSource.getRepository(Stream)
        return await streamRepository.find(pagination)
    }
}