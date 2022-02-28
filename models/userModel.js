const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please provide your name'] },
  email: { type: String, required: [true, 'Please provide your email'], unique: true, lowercase: true, validate: [validator.isEmail, 'Please provide a valid email'] },
  password: { type: String, required: [true, 'Please provide your password'], minlength: 8 },
  confirmPassword: {
    type: String,
    required: true,
    validate: function (el) {
      return el == this.password;
    },
    message: 'Password are not same',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
