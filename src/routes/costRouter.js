import Router from 'koa-router';
import costsController from '../controllers/costsController';
import validator from '../middleware/validation';
import db from '../db';

export const costs = new Router({
  prefix: '/api'
});

const controller = costsController(db);

costs
  .get('/costs',
    validator.checkQuery,
    controller.get
  )
  .get('/costs/today', controller.getTodayCosts)
  .post('/costs',
    validator.checkNewCost,
    controller.post
  )
  .param('cost', controller.findCost)
  .get('/costs/cost/:cost', controller.getCost)
  .put('/costs/cost/:cost', controller.update);
