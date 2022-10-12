const express = require('express');
const userRouter = require('./users.router');
const productsRouter = require('./products.router');
const categoryRouter = require('./category.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoryRouter);
}

module.exports = routerApi;
