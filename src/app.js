import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import costRouter from './routes/costRouter';
import { clientErrorHandler } from './error-handles/clientErrorHandler';
import config from '../config';

const app = express();
mongoose.connect(config.dbUrl, { useNewUrlParser: true });

mongoose.connection
  .on('error', console.error.bind(console, 'db connection error: '));

mongoose.connection.once('open', () => {
  process.stdout.write('Connected to MongoDB\n');
});

app.use(bodyParser.json());
app.use('/api', costRouter);
app.use(clientErrorHandler);

export default app.listen(config.port, () =>
  process.stdout.write(`Running on port ${config.port}\n`));
