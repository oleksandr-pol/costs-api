import express from 'express';
import mongoose from 'mongoose';
import Book from './models/bookModel';

const port = process.env.PORT || 3000;

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {

    Book.find(req.query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Running on port ${port}`));
