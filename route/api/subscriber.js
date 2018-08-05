const router = require('express').Router();
const subscribersController = require('./../../controller/subscriberController');

router.route('/')
  .post(subscribersController.create);

module.exports = router;
