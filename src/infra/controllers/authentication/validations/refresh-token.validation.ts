import { RefreshTokenDTO } from '@/application/authentication/dtos/refresh-token.dto';
import Joi from 'joi';

export class RefreshTokenJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<RefreshTokenDTO>({
      accessToken: Joi.string(),
      refreshToken: Joi.string(),
    });

    return schema.validateAsync(input);
  }
}
