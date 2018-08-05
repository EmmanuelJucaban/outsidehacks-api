const router = require('express').Router();
const jukeboxController = require('./../../controller/jukeboxController');

router.route('/')
  .get(broadcasterController.findOne)
  .post(broadcasterController.addTrack);


module.exports = router;
