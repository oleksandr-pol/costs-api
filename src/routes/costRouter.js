import Router from 'koa-router';
import Cost from '../models/costModel';
import costsController from '../controllers/costsController';

export const costs = new Router({
  prefix: '/api'
});

const controller = costsController(Cost);

costs.get('/costs', controller.get)
  .post('/costs', controller.post)
  .param('cost', controller.findCost)
  .get('/costs/:cost', controller.getCost);
