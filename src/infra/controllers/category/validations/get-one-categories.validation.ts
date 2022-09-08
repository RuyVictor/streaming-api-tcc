import { GetOneCategoryDTO } from '@/application/category/dtos/get-category-by-name.dto';
import Joi from 'joi';

export class GetOneCategoryJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<GetOneCategoryDTO>({
      name: Joi.string().required(),
    });

    return schema.validateAsync(input);
  }
}
