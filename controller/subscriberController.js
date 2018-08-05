const Subscriber  = require('./../model').Subscriber;
const Broadcaster = require('./../model').Broadcaster;

module.exports = {
  create: async (req, res) => {
    try {
      const broadcaster = await Broadcaster.findById(req.body.id);
      const newSub = new Subscriber({
        username      : req.body.username,
        subId         : req.body.subId,
        contribution  : 0
      });





    }

  }
}
