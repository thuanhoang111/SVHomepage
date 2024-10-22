const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the user name."],
  },
  email: {
    type: String,
    required: [true, "Please enter the user email."],
    lowercase: [true, "The user email must be a lowercase."],
    unique: [true, "The user email must be a unique."],
  },
  password: {
    type: String,
    required: [true, "Please enter the user password."],
  },
  verified: {
    type: Boolean,
    default: false,
    required: [true, "Please enter the user verified."],
  },
  phone: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Please select the correct gender for this user.",
    },
  },
  avatar: {
    type: String,
  },
  role: {
    type: [String],
    required: [true, 'Please enter the user role.'],
    default: 'user',
    enum: {
      values: ["user", "admin"],
      message: "Please select the correct role for this user.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "Please select this user registration period."],
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("user", userSchema);
