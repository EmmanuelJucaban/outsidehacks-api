const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TrackSchema = new Schema({
  username : String,
  artist   : String,
  title    : String,
  trackId  : Number,
  duration : Number,
});

module.exports = mongoose.model('Track', TrackSchema);
