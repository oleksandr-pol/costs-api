export default function costsController(db, validator) {
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
      await validator.checkQuery(ctx.query);
      ctx.body = await db.get(ctx.query);
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }

  async function post(ctx) {
    try {
      await validator.checkCost(ctx.request.body);
      ctx.body = await db.save(ctx.request.body);
      ctx.status = 201;
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }

  async function findCost(id, ctx, next) {
    try {
      await validator.checkId(id);
      ctx.cost = await db.getById(id);
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
    await validator.checkCost(ctx.request.body);

    ctx.body = await db.updateById(
      ctx.cost._id,
      ctx.request.body
    );
  }
}
