const router = require('express').Router();
const jukeboxController = require('./../../controller/jukeboxController');

router.route('/')
  .post(jukeboxController.addTrack);

router.route('/:id')
  .get(jukeboxController.findOne);

module.exports = router;
