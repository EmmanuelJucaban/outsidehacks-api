const router = require('express').Router();
const broadcasterController = require('./../controller/broadcasterController');

router.route('/')
  .get(broadcasterController.findOne)
  .post(broadcasterController.create)
  .delete(broadcasterController.delete)


module.exports = router;
