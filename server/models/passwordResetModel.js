const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please enter the user's id want to reset the password."],
  },
  resetString: {
    type: String,
    required: [
      true,
      "Please enter the user's reset string want to reset the password.",
    ],
  },
  createdAt: {
    type: Date,
    required: [true, 'Please select a time user want to reset the password.'],
  },
  expiresAt: {
    type: Date,
    required: [
      true,
      'Please select an expiration time the user wants to reset the password.',
    ],
  },
});

module.exports = mongoose.model('passwordReset', passwordResetSchema);
