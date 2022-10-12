//PRODUCTS
const express = require('express');
const ProductsService = require('../service/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/products.schema');

const router = express.Router();
const service = new ProductsService();

//----------------------GET-------------------------//
router.get('/', async (request, response, next) => {
  try {
    // const { size } = request.query;
    const products = await service.find();
    response.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/filter', async (request, response) => {
  response.send('I am filter');
});

//ALL ROUTES THAT HAVE PARAMS PARAMETERS GO LAST
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const product = await service.findOne(id);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }
);
//--------------------------------------------------//

//----------------------POST-------------------------//
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),

  async (request, response) => {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json(newProduct);
  }
);
//--------------------------------------------------//

//------------------PATCH || PUT--------------------//
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const product = await service.updated(id, body);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }
);
//--------------------------------------------------//

//--------------------DELETE------------------------//
router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const res = await service.delete(id);
  response.json(res);
});
//--------------------------------------------------//

module.exports = router;
