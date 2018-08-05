const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const SubscriberSchema = new Schema({
  username    : String,
  subId       : String,
  contribution: Number,
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
