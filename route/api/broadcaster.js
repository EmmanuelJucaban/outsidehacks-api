const router = require('express').Router();
const broadcasterController = require('./../../controller/broadcaster');

router.route('/')
  .get(broadcasterController.findAll)
  .post(broadcasterController.create);

router.route('/:id')
  .get(broadcasterController.findOne)
  .delete(broadcaster.delete);


module.exports = router;
