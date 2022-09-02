import { Router } from 'express';
import {
  GetRootCategoriesController,
  GetSubcategoriesController,
  GetOneCategoryController,
  GetSelectableCategoriesController,
} from '@/infra/controllers/category';

const router = Router();

router.get('/find-roots', GetRootCategoriesController.handle);
router.get('/find-subs', GetSubcategoriesController.handle);
router.get('/find-one', GetOneCategoryController.handle);
router.get('/selectable', GetSelectableCategoriesController.handle);

export { router as categoryRoutes };
