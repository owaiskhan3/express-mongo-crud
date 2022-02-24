const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  groupSize: { type: Number, required: true },
});

const tourModel = mongoose.model('tours', tourSchema);

module.exports = tourModel;
