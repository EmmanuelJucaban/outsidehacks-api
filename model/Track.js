const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TrackSchema = new Schema({
  artist: String,
  title:  String,
  trackId: Number
});

module.exports = mongoose.model('Track', TrackSchema);
