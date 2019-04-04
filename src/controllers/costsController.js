import moment from 'moment';

export default function costsController(Cost) {
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
      ctx.body = await Cost.find(ctx.query);
    } catch(e) {
      ctx.throw(404, e.message)
    }
  }

  async function post(ctx) {
    try {
      const cost = new Cost(ctx.request.body);
      ctx.body = await cost.save();
      ctx.status = 201;
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }

  async function findCost(id, ctx, next) {
    try {
      ctx.cost = await Cost.findById(id);
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
      ctx.body = await Cost
        .find({ createdAt: { $gte: moment.utc().startOf('day') }})
        .sort({ createdAt: 1 });

    } catch(e) {
      ctx.throw(e);
    }
  }

  async function update(ctx) {
    try {
      ctx.body = await Cost.findOneAndUpdate(
        { _d: ctx.cost._id },
        { $set: ctx.request.body },
        { useFindAndModify: false }
      );
    } catch(e) {
      ctx.throw(400, e.message);
    }
  }
}
