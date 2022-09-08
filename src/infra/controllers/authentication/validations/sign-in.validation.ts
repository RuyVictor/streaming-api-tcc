import { SignInDTO } from '@/application/authentication/dtos/sign-in.dto';
import Joi from 'joi';

export class SignInJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<SignInDTO>({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    return schema.validateAsync(input);
  }
}
