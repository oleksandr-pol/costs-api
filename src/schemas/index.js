import costSchema from '../schemas/costSchema';
import costQuery from '../schemas/costQuerySchema';
import costIdSchema from '../schemas/costIdSchema';

export default {
  checkCost: async cost => costSchema.validate(cost, { abortEarly: false }),
  checkQuery: async query => costQuery.validate(query),
  checkId: async id => costIdSchema.validate(id)
};
