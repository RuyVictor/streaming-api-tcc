import { IPagination } from '../common/interfaces/Pagination';
import { AppDataSource } from '../database';
import { Stream } from '../models/Stream';

export class StreamService {
    static async getStreams(pagination?: IPagination): Promise<Stream[]> {
        const streamRepository = AppDataSource.getRepository(Stream)
        return await streamRepository.find(pagination)
    }
}