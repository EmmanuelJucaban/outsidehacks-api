const router = require('express').Router();
const jukeboxController = require('./../../controller/jukeboxController');

router.route('/')
  .get(jukeboxController.findOne)
  .post(jukeboxController.addTrack);


module.exports = router;
