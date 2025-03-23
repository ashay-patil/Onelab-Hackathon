const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'lastName',
    },
  });

  module.exports = mongoose.model('user',UserSchema);