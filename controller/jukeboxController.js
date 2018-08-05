const Track        = require('./../model').Track;
const Broadcaster  = require('./../model').Broadcaster;
const Jukebox      = require('./../model').Jukebox;

module.exports = {
  findOne: async (req, res) => {
    try {
      const jukebox = await Jukebox.findById(req.params.id).populate('tracks');
      res.json(jukebox)
    } catch(e) {
      res.json(e);
    }
  },
  addTrack: async (req, res) => {



    try {
      let newSong = new Track({
        artist  : req.body.artist,
        title   : req.body.title,
        trackId : req.body.trackId
      });
      const jukebox = await Jukebox.findById(req.body.casterId).populate('tracks');
      console.log(jukebox);
      newSong = await newSong.save();
      jukebox.tracks.push(newSong);
      const user = jukebox.contributors.find(user => user._id === req.body.userId);
      console.log(user);
      if(user) {
        console.log("Fired at use");
        user.contribution = user.contribution + 1;
        jukebox.totalContributions += user.contribution;
        await jukebox.save();
        console.log(jukebox);
        res.json(jukebox.populate('tracks'));
      }
      if(!user) {
        console.log("fired");
        jukebox.contributors.push({_id: req.body.userId, contribution: 1});
        jukebox.totalContributions++;
        await jukebox.save();
        console.log(jukebox);
        res.json(jukebox.populate('tracks'));
      }



    } catch(e) {
      res.json(e);
    }
  },
};
