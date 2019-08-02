export async function setConstId(id, ctx, next) {
  ctx.costId = id;
  await next();
}
