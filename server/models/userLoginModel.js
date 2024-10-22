const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter the user's id need login."],
  },
  loginString: {
    type: String,
    required: [true, "Please enter the user's login string that needs login."],
  },
  createdAt: {
    type: Date,
    required: [true, 'Please select a time user need to login.'],
  },
  expiresAt: {
    type: Date,
    required: [
      true,
      'Please select an expiration time the user needs to login.',
    ],
  },
});

module.exports = mongoose.model('userLogin', userLoginSchema);
