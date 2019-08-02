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
    try {
      ctx.body = await db.get(ctx.query);
    } catch(e) {
      ctx.throw(400, e.message);
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

  async function findCost(ctx, next) {
    try {
      ctx.cost = await db.getById(ctx.id);
      await next();
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }

  async function getCost(ctx) {
    ctx.body = ctx.cost;
  }

  async function getTodayCosts(ctx) {
    ctx.body = await db.getTodayCosts();
  }

  async function update(ctx) {
    try {
      const updatedId = await db.updateById(
        ctx.cost._id,
        ctx.request.body
      );
      ctx.body = updatedId;
    } catch(e) {
      throw (400, e.message);
    }
  }
}
