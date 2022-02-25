const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      token,
      data: newUser,
      message: 'Registration Successful',
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};
