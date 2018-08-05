const Subscriber  = require('./../model').Subscriber;
const Broadcaster = require('./../model').Broadcaster;

module.exports = {
  create: async (req, res) => {
    try {
      let broadcaster = await Broadcaster.findById(req.body.casterId);
      let newSub = new Subscriber({
        username      : req.body.username,
        subId         : req.body.subId,
        contribution  : 0
      });
      newSub = await newSub.save();
      broadcaster.subscribers.push(newSub);
      broadcaster = await broadcaster.save();
      res.json(broadcaster);
    } catch(e) {
      res.json(e);
    }
  },
};
