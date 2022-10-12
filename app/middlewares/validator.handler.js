const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(
      data,
      {
        abortEarly: false,
      } /* 'abortEarly': THIS IS TO SEND ALL THE ERRORS IN A SINGLE REPLY */
    );
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
module.exports = validatorHandler;
