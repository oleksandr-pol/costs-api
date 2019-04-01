export default function costsController(Cost) {
  return {
    get,
    post,
    getById
  };

  function get(req, res) {
    // @TO-DO: validate query params
    Cost.find(req.query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  }

  function post(req, res) {
    // @TO-DO: validate body
    const book = new Cost(req.body);
    book.save((err, cost) => {
      if (err) {
        return res.status(400).json(err);
      }

      return res.status(201).json(cost);
    });
  }

  function getById(req, res) {
    // @TO-DO: validate params
    Cost.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }

      return res.json(book);
    });
  }
}
