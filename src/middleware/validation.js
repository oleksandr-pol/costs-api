import costSchema from '../schemas/costSchema';
import costQuery from '../schemas/costQuerySchema';
import costIdSchema from '../schemas/costIdSchema';

export default {
  checkNewCost: async (ctx, next) => {
    try {
      await costSchema.validate(
        ctx.request.body,
        { abortEarly: false }
      );

      await next();
    } catch (e) {
      ctx.throw(400, e.message);
    }
  },
  checkQuery: async (ctx, next) => {
    try {
      await costQuery.validate(ctx.query);
      await next();
    } catch (e) {
      ctx.throw(400, e.message);
    }
  },
  checkId: async (ctx, next) => {
    try {
      await costIdSchema.validate(ctx.params.cost);
      await next();
    } catch (e) {
      ctx.throw(400, e.message);
    }
  }
}
