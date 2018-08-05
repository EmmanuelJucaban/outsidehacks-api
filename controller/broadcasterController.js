const mongoose = require('mongoose');
const Broadcaster = require('./../model').Broadcaster;
const Jukebox = require('./../model').Jukebox;


module.exports = {
  findOne: (req, res) => {
     Broadcaster
    .findById(req.params.id)
    .then(broadcaster => res.json(broadcaster))
  },
  create: async (req, res) => {
    const newCaster = new Broadcaster({
      userId: req.body.userId,
      accessToken: req.body.accessToken,
      channelId: req.body.channelId
    });

    try {
      const broadcaster = await newCaster.save();
      const newJukebox  = new Jukebox({
        tracks            : [],
        totalContributions: 0,
        contributors      : []
      });

      const jukebox = await newJukebox.save();
      broadcaster.jukebox = jukebox;
      await broadcaster.save();
      res.json(newCaster);
    } catch(e) {
      res.json(e);
    }
  },
  delete: async (req, res) => {
    try {
      const caster = await Broadcaster.findOneAndDelete({_id: req.body.id});
      res.json(caster)
    } catch(e) {
      res.json(e);
    }
  }
};
