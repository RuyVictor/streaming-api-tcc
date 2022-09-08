import { GetSubcategoriesDTO } from '@/application/category/dtos/get-subcategories.dto';
import Joi from 'joi';

export class GetSubcategoriesJoiSchema {
  static validate(input: any) {
    const schema = Joi.object<GetSubcategoriesDTO>({
      name: Joi.string().required(),
      page: Joi.number(),
      take: Joi.number(),
    });

    return schema.validateAsync(input);
  }
}
