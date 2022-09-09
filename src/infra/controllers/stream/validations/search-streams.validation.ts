import { SearchStreamsDTO } from '@/application/stream/dtos/search-streams.dto';
import Joi from 'joi';

export class SearchStreamsJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<SearchStreamsDTO>({
      query: Joi.string().empty(''),
      status: Joi.string().empty(''),
      category: Joi.string().empty(''),
      page: Joi.number().allow(null),
      take: Joi.number().allow(null),
    });

    return schema.validateAsync(input);
  }
}
