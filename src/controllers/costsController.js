import { ClientError} from '../error-handles/clientError';

export default function costsController(Cost) {
  return {
    get,
    post,
    getById
  };

  function get(req, res, next) {
    // @TO-DO: validate query params
    Cost.find(req.query).then(costs => res.json(costs))
      .catch(err => next(new ClientError(400, err)));
  }

  function post(req, res, next) {
    // @TO-DO: validate body
    const book = new Cost(req.body);
    return book.save()
      .then(cost => res.status(201).json(cost))
      .catch(err => next(new ClientError(400, err)));
  }

  function getById(req, res, next) {
    // @TO-DO: validate params
    Cost.findById(req.params.costId)
      .then(cost => res.json(cost))
      .catch(err => next(new ClientError(400, err)));
  }
}
