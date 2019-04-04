export const addErrorHandler = app => app.use(async (ctx, next) => {
  try {
    await next();
  } catch(e) {
    if (e.status) {
      ctx.body = e.message;
      ctx.status = e.status;
    } else {
      ctx.body = 'Server Error';
      ctx.status = 500;
      console.error(e.message, e.stack);
    }
  }
});
