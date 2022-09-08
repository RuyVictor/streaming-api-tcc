import { SignUpDTO } from '@/application/authentication/dtos/sign-up.dto';
import Joi from 'joi';

export class SignUpJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<SignUpDTO>({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validateAsync(input);
  }
}
