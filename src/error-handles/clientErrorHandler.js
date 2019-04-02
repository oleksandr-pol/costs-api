export function clientErrorHandler(err, req, res, next) {
  if (err.clientError) {
    return res.status(err.statusCode).json(err);
  } else {
    next(err);
  }
}
