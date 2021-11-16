const notFound = (req, res, next) => {
  console.log('notFound')
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log('errorHandler');
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  return res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
};


export { notFound, errorHandler };