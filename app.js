import express from 'express';
import mongoose from 'mongoose';
import bookRouter from './routes/bookRouter';

const port = process.env.PORT || 3000;

const app = express();
mongoose.connect('mongodb://localhost/bookAPI');

app.use('/api', bookRouter);

app.listen(port, () => console.log(`Running on port ${port}`));
