const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const getSignedToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = getSignedToken(newUser._id);

    res.status(201).json({
      success: true,
      token,
      data: newUser,
      message: 'Registration Successful',
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: 'Please provide valid email and password',
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.json({
        success: false,
        message: 'email or password is incorrect',
      });
    }
    const token = getSignedToken(user._id);
    res.json({
      token,
      success: true,
      data: {
        _id: user._id,
        name: user.email,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
