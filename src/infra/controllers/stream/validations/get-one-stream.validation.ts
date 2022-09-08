import { GetOneStreamDTO } from '@/application/stream/dtos/get-one-stream.dto';
import Joi from 'joi';

export class GetOneStreamJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<GetOneStreamDTO>({
      hostname: Joi.string().required(),
    });

    return schema.validateAsync(input);
  }
}
