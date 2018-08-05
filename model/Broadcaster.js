const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BroadcasterSchema = new Schema({
  userId      : Number,
  accessToken : String,
  channelId   : String,
  jukebox     : {type: Schema.Types.ObjectId, ref: 'Jukebox'},
  subscribers : [{type: Schema.Types.ObjectId, ref: 'Subscriber'}],
});


module.exports = mongoose.model('Broadcaster', BroadcasterSchema);
