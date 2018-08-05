const router              = require('express').Router();
const jukeboxRoutes       = require('./jukebox');
const broadcasterRoutes   = require('./broadcaster');
const subscriberRoutes    = require('./subcriber');
const trackRoutes         = require('./track')

router.use('/jukebox', jukeboxRoutes);
router.use('/track', trackRoutes);
router.use('/broadcaster', broadcasterRoutes);
router.use('/subcriber', subscriberRoutes);

module.exports = router;
