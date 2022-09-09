import { RefreshTokenDTO } from '@/application/authentication/dtos/refresh-token.dto';
import { EditStreamRequestDTO } from '@/application/stream/dtos/edit-stream.dto';
import Joi from 'joi';

export class EditStreamJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<EditStreamRequestDTO & RefreshTokenDTO>({
      categoryId: Joi.string().uuid().required(),
      userId: Joi.string().uuid().required(),
      description: Joi.string().empty('').allow(null),
      title: Joi.string().required(),
      accessToken: Joi.string().required(),
    });

    return schema.validateAsync(input);
  }
}
