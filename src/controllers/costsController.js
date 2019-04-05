export default function costsController(db) {
  return {
    get,
    post,
    findCost,
    getCost,
    getTodayCosts,
    update
  };

  async function get(ctx) {
    // @TO-DO: validate query params
    try {
      ctx.body = await db.get(ctx.query);
    } catch(e) {
      ctx.throw(404, e.message)
    }
  }

  async function post(ctx) {
    try {
      ctx.body = await db.save(ctx.request.body);
      ctx.status = 201;
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }

  async function findCost(id, ctx, next) {
    try {
      ctx.cost = await db.getById(id);
      await next();
    } catch(e) {
      ctx.throw(404, e.message);
    }
  }

  async function getCost(ctx) {
    ctx.body = ctx.cost;
  }

  async function getTodayCosts(ctx) {
    try {
      ctx.body = await db.getTodayCosts();
    } catch(e) {
      ctx.throw(e);
    }
  }

  async function update(ctx) {
    try {
      ctx.body = await db.updateById(
        ctx.cost._id,
        ctx.request.body
      );
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }
}
