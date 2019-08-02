import costSchema from '../schemas/costSchema';
import costQuery from '../schemas/costQuerySchema';
import costIdSchema from '../schemas/costIdSchema';

export default {
  checkCost: async (ctx, next) => {
    const cost = ctx.request.body;
    try {
      await costSchema.validate(cost, { abortEarly: false });
      await next();
    } catch (e) {
      if (e.status) {
        ctx.throw(e);
        return;
      }

      ctx.throw(400, e.message);
    }
  },
  checkQuery: async (ctx, next) => {
    try {
      await costQuery.validate(ctx.query);
      await next();
    } catch (e) {
      if (e.status) {
        ctx.throw(e);
        return;
      }

      ctx.throw(400, e.message);
    }
  },
  checkId: async (id, ctx, next) => {
    try {
      await costIdSchema.validate(id);
      await next();
    } catch(e) {
      if (e.status) {
        ctx.throw(e);
        return;
      }

      ctx.throw(400, e.message);
    }
  }
};
