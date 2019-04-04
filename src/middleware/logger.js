import logger from 'koa-logger';

export const addLogger = app => app.use(logger());
