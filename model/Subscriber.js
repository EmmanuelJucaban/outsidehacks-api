const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SubscriberSchema = new Schema({
  username    : String,
  subId       : String,
  contribution: [{
    channel: {
      type: Schema.Types.ObjectId,
      ref: "broadcasters"
    },
    score: Number,
  }],
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
