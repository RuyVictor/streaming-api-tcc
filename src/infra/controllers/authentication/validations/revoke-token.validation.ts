import { RevokeTokenDTO } from '@/application/authentication/dtos/revoke-token.dto';
import Joi from 'joi';

export class RevokeTokenJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<RevokeTokenDTO>({
      accessToken: Joi.string(),
      refreshToken: Joi.string(),
    });

    return schema.validateAsync(input);
  }
}
