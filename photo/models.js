const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
   
  file: { type: String, required: true }
});

module.exports = mongoose.model('Photo', PhotoSchema);