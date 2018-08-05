const Track        = require('./../model').Track;
const Broadcaster = require('./../model').Jukebox;

module.exports = {
  findOne: async (req, res) => {
    try {
      const jukebox = await Jukebox.findById(req.body.id);
      res.json(jukebox)
    } catch(e) {
      res.json(e);
    }
  },
  addTrack: async (req, res) => {
    const newSong = new Track({
      artist  : req.body.artist,
      title   : req.body.title,
      trackId : req.body.trackId
    });

    try {
      await newSong.save();
      const jukebox = await jukebox.findbyId(req.body.id);
      jukebox.push(newSong);
      await jukebox.save();
      res.json(jukebox);
    } catch(e) {
      res.json(e);
    }
  },
  create: (req, res) => {
    const newJukebox = new Jukebox({
      tracks: [],
      totalContributions: 0,
      username: req.body.username
      contributors: []
    });


  }
};
