import { SearchStreamsDTO } from '@/application/stream/dtos/search-streams.dto';
import Joi from 'joi';

export class SearchStreamsJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<SearchStreamsDTO>({
      query: Joi.string(),
      status: Joi.string(),
      category: Joi.string(),
      page: Joi.number(),
      take: Joi.number(),
    });

    return schema.validateAsync(input);
  }
}
