import Koa from 'koa';
import mongoose from 'mongoose';
import { costs } from './routes/costRouter';
import config from '../config';
import * as fromMiddleware from './middleware';

const app = new Koa();
mongoose.connect(config.dbUrl, { useNewUrlParser: true });

mongoose.connection
  .on('error', console.error.bind(console, 'db connection error: '));

mongoose.connection.once('open', () => {
  process.stdout.write('Connected to MongoDB\n');
});

fromMiddleware.addLogger(app);
fromMiddleware.addErrorHandler(app);
fromMiddleware.addBodyParser(app);

app.use(costs.routes());

export default app.listen(config.port, () =>
  process.stdout.write(`Running on port ${config.port}\n`));

process.on('exit', () => mongoose.disconnect());
