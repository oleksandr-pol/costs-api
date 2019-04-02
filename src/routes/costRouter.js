import express from 'express';
import Cost from '../models/costModel';
import costsController from '../controllers/costsController';

const costRouter = express.Router();
const controller = costsController(Cost);

export default costRouter;

costRouter.route('/costs')
  .post(controller.post)
  .get(controller.get);

costRouter.route('/costs/:costId')
  .get(controller.getById);
