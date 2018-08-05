const router = require('express').Router();
const broadcasterController = require('./../../controller/broadcasterController');

router.route('/')
  .post(broadcasterController.create)
  .delete(broadcasterController.delete)


router.route('/:id')
  .get(broadcasterController.findOne)

module.exports = router;
