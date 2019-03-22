import express from 'express';
import Book from '../models/bookModel';

const bookRouter = express.Router();
export default bookRouter;

bookRouter.route('/books')
  .get((req, res) => {
    Book.find(req.query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }

      return res.json(book);
    });
  });
