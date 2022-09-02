import { Stream } from '@/domain/stream.entity';
import {
  SearchStreamsDTO,
  SearchStreamsOutputDTO,
} from '../dtos/search-streams.dto';
import { EditStreamDatabaseDTO } from '../dtos/edit-stream.dto';
import {
  GetTransmissionKeyDTO,
  GetTransmissionKeyOutputDTO,
} from '../dtos/get-transmission-key.dto';
import { CreateRelationStreamUserDTO } from '../dtos/create-relation-stream-user.dto';

export interface StreamRepositoryInterface {
  searchStreams(input: SearchStreamsDTO): Promise<SearchStreamsOutputDTO>;
  findById(id: string): Promise<Stream>;
  findByHostId(hostId: string): Promise<Stream>;
  findByHostname(hostname: string): Promise<Stream>;
  findByIdAndReturnWithTransmissionKey(id: string): Promise<Stream>;
  edit(input: EditStreamDatabaseDTO): Promise<Stream>;
  getTransmissionKey(
    input: GetTransmissionKeyDTO
  ): Promise<GetTransmissionKeyOutputDTO>;
  createRelationWithUser(input: CreateRelationStreamUserDTO): Promise<void>;
}
