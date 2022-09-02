import { CreateRelationWithUserRepositoryTypeORM } from './create-relation-with-user.repository';
import { EditStreamRepositoryTypeORM } from './edit-stream.repository';
import { GetStreamByHostRepositoryTypeORM } from './get-stream-by-host.repository';
import { GetStreamByIdRepositoryTypeORM } from './get-stream-by-id.repository';
import { GetStreamByHostIdRepositoryTypeORM } from './get-stream-by-host-id.repository';
import { GetStreamByIdAndReturnWithTransmissionKeyRepositoryTypeORM } from './get-stream-with-transmission-key.repository';
import { SearchStreamsRepositoryTypeORM } from './search-streams.repository';
import { StreamRepositoryInterface } from '@/application/stream/repositories/stream.repository';
import { CreateRelationStreamUserDTO } from '@/application/stream/dtos/create-relation-stream-user.dto';
import { EditStreamDatabaseDTO } from '@/application/stream/dtos/edit-stream.dto';
import {
  GetTransmissionKeyDTO,
  GetTransmissionKeyOutputDTO,
} from '@/application/stream/dtos/get-transmission-key.dto';
import {
  SearchStreamsDTO,
  SearchStreamsOutputDTO,
} from '@/application/stream/dtos/search-streams.dto';
import { Stream } from '@/domain/stream.entity';
import { GetTransmissionKeyRepositoryTypeORM } from './get-transmission-key.repository';

export class StreamRepositoryTypeORM implements StreamRepositoryInterface {
  searchStreams(input: SearchStreamsDTO): Promise<SearchStreamsOutputDTO> {
    return new SearchStreamsRepositoryTypeORM().searchStreams(input);
  }

  findById(id: string): Promise<Stream> {
    return new GetStreamByIdRepositoryTypeORM().findById(id);
  }

  findByHostId(hostId: string): Promise<Stream> {
    return new GetStreamByHostIdRepositoryTypeORM().findByHostId(hostId);
  }

  findByHostname(hostname: string): Promise<Stream> {
    return new GetStreamByHostRepositoryTypeORM().findByHostname(hostname);
  }

  findByIdAndReturnWithTransmissionKey(id: string): Promise<Stream> {
    return new GetStreamByIdAndReturnWithTransmissionKeyRepositoryTypeORM().findByIdAndReturnWithTransmissionKey(
      id
    );
  }

  edit(input: EditStreamDatabaseDTO): Promise<Stream> {
    return new EditStreamRepositoryTypeORM().edit(input);
  }

  getTransmissionKey(
    input: GetTransmissionKeyDTO
  ): Promise<GetTransmissionKeyOutputDTO> {
    return new GetTransmissionKeyRepositoryTypeORM().getTransmissionKey(input);
  }

  createRelationWithUser(input: CreateRelationStreamUserDTO): Promise<void> {
    return new CreateRelationWithUserRepositoryTypeORM().createRelationWithUser(
      input
    );
  }
}
