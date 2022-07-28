import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();

router.get('/find', CategoryController.getCategories);
router.get('/find-one', CategoryController.getOneCategory);
router.get('/selectable', CategoryController.getSelectableCategories);

export default router;
