const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  title: { type: String, required: true },
});

const tourModel = mongoose.model('tours', tourSchema);

module.exports = tourModel;
