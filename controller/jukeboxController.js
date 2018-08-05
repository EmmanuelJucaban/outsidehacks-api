const Track        = require('./../model').Track;
const Broadcaster  = require('./../model').Broadcaster;
const Jukebox      = require('./../model').Jukebox;

module.exports = {
  findOne: async (req, res) => {
    try {
      const jukebox = await Jukebox.findById(req.params.id).populate('tracks').populate('contributors');
      console.log(jukebox.contributors);
      res.json(jukebox)
    } catch(e) {
      res.json(e);
    }
  },
  addTrack: async (req, res) => {

    try {
      let newSong = new Track({
        artist   : req.body.artist,
        title    : req.body.title,
        trackId  : req.body.trackId,
        duration : req.body.duration,
        image    : req.body.image,
      });
      console.log(newSong, "safsaihdbaidhva");
      const jukebox = await Jukebox.findById(req.body.jukeboxId).populate('tracks').populate('contributors');

      newSong = await newSong.save();

      jukebox.tracks.push(newSong);
      const user = jukebox.contributors.find(user => user._id === req.body.userId);
      if(user) {
        console.log("Fired at use");
        user.contribution = user.contribution + 1;
        jukebox.totalContributions += user.contribution;
        await jukebox.save();
        res.json(jukebox);
      }
      if(!user) {
        console.log("fired");
        jukebox.contributors.push({_id: req.body.userId, contribution: 1});
        jukebox.totalContributions++;
        await jukebox.save();
        res.json(jukebox);
      }
    } catch(e) {
      res.json(e);
    }
  },
  deleteTrack: async (req, res) => {
    try {
      const jukebox = await Jukebox.findById(req.body.id).populate('tracks');
      const deleted = jukebox.tracks.shift();
      await jukebox.save();
      res.json({tracks: jukebox.tracks, deleted});
    } catch(e) {
      res.json(e);
    }
  }
};
