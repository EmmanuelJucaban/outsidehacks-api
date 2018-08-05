const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const JukeboxSchema = new Schema({
  tracks             : [{type: Schema.Types.ObjectId, ref: 'Track'}],
  totalContributions : Number,
  contributors       : [{type: Schema.Types.ObjectId, ref: 'Subscriber'}]
});

module.exports = mongoose.model('Jukebox', JukeboxSchema);
