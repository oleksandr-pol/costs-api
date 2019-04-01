import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import costRouter from './routes/costRouter';

const port = process.env.PORT || 3000;

const app = express();
mongoose.connect('mongodb://localhost/costsApi', { useNewUrlParser: true });

mongoose.connection
  .on('error', console.error.bind(console, 'db connection error: '));

mongoose.connection.once('open', () => {
  process.stdout.write('Connected to MongoDB\n');
  app.listen(port, () => process.stdout.write(`Running on port ${port}\n`));
});
// @TODO: add error handling
app.use(bodyParser.json());
app.use('/api', costRouter);

