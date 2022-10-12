//Create function that will make us reach a middleware of type error:
function logErrors(err, req, res, next) {
  console.log('logError');
  console.error(err); //show the error in server to be able to monitor it.
  next(err); //important to know that it is being sent to a middleware of type error, if it does not have the error inside then it is being sent to a normal one.
}
// Create format to return to the client that complements the previous function:
function errorHandler(err, req, res, next) {
  // console.log('errorHandler');
  //even if you don't use next in the code you must put it here, since an error middleware has the four parameters
  res.status(500).json({
    //indicate the error is status 500 Internal Server Error
    message: err.message, //show the client the error message
    stack: err.stack, //show error info
  });
}
function boomErrorHandler(err, req, res, next) {
  // console.log('errorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
module.exports = { logErrors, errorHandler, boomErrorHandler };
