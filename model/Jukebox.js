const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const JukeboxSchema = new Schema({
  tracks             : [{type: Schema.Types.ObjectId, ref: 'Track'}],
  contributors       : [{type: Schema.Types.ObjectId, ref: 'Subscriber'}],
  totalContributions : Number,
});

module.exports = mongoose.model('Jukebox', JukeboxSchema);
