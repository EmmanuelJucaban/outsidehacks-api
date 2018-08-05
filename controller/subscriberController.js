const Subscriber  = require('./../model').Subscriber;
const Broadcaster = require('./../model').Broadcaster;

module.exports = {
  create: async (req, res) => {
    console.log(req.body);
    try {
      let broadcaster = await Broadcaster.findById(req.body.casterId);
      let newSub = new Subscriber({
        username      : req.body.username,
        subId         : req.body.subId,
        contribution  : [{_id: Broadcaster._id, score: 1}]
      });
      newSub = await newSub.save();
      broadcaster.subscribers.push(newSub);
      broadcaster = await broadcaster.save();
      res.json(newSub);
    } catch(e) {
      res.json(e);
    }
  },
};
