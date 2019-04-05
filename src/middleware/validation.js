import costSchema from '../schemas/costSchema';
import costQuery from '../schemas/costQuerySchema';

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
  }
}
