import { GetTransmissionKeyDTO } from '@/application/stream/dtos/get-transmission-key.dto';
import { RefreshTokenDTO } from '@/application/authentication/dtos/refresh-token.dto';
import Joi from 'joi';

export class GetTransmissionKeyJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<GetTransmissionKeyDTO & RefreshTokenDTO>({
      userId: Joi.string().uuid().required(),
      accessToken: Joi.string(),
    });

    return schema.validateAsync(input);
  }
}
