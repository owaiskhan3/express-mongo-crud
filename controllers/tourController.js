const Tours = require('../models/tourModel');

exports.getAllTours = async (req, res, next) => {
  const tour = await Tours.find();
  res.send({
    tours: tour,
  });
};

exports.getTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await Tours.findById(id);
    res.send({
      tour,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Tours.findByIdAndDelete({ _id: id });
    res.send({
      success: true,
      message: 'Tour delete successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await Tours.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        duration: req.body.duration,
        groupSize: req.body.groupSize,
      },
      {
        new: true,
      }
    );
    res.send({
      success: true,
      message: 'Updated successful',
      tour,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const { title, duration, groupSize } = req.body;
    const tour = await Tours.create({
      title,
      duration,
      groupSize,
    });

    res.send({
      tours: tour,
    });
  } catch (error) {
    res.send(error);
  }
};
