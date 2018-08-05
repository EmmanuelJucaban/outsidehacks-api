const router              = require('express').Router();
const jukeboxRoutes       = require('./jukebox');
const broadcasterRoutes   = require('./broadcaster');
// const subscriberRoutes    = require('./subscriber');
// const trackRoutes         = require('./track')

router.use('/jukebox', jukeboxRoutes);
// router.use('/track', trackRoutes);
router.use('/broadcaster', broadcasterRoutes);
// router.use('/subscriber', subscriberRoutes);

module.exports = router;
