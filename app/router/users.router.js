const express = require('express');
const router = express.Router();

//USERS
router.get('/', (request, response) => {
  const { limit, offset } = request.query;
  if (limit && offset) {
    response.json({
      limit,
      offset,
    });
  } else {
    response.send('NO HAY');
  }
});

module.exports = router;
