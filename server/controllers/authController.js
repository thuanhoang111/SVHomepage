const createError = require("http-errors");
const User = require("../models/userModel");
const {
  authRegisterSchema,
  authLoginSchema,
} = require("../utils/validationSchema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../middlewares/jwtHelper");
const client = require("../helpers/initRedis");
const UserVerification = require("../models/userVerificationModel");
const UserLogin = require("../models/userLoginModel");
const PasswordReset = require("../models/passwordResetModel");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const APIFeature = require("../utils/apiFeatures");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendVerificationEmail = async (
  { _id, email },
  urlRedirect,
  res,
  next
) => {
  try {
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Verify your email address to complete the signup and login into your account</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
        process.env.CURRENT_URL + "auth/verify/" + _id + "/" + uniqueString
      }>here</a> to procced</p>`,
    };
    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: hashedUniqueString.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
      urlRedirect,
    });
    await newVerification.save();
    await transporter.sendMail(mailOptions);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const sendResetEmail = async ({ _id, email }, redirectUrl, res, next) => {
  try {
    const resetString = uuidv4() + _id;
    await PasswordReset.deleteMany({ userId: _id });
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Password Reset",
      html: `<p>We heard that your lost the password.</p><p>Don't worry, use the link below to reset it.</p><p>This link <b>expires in 60 minutes</b>.</p><p>Press <a href=${
        redirectUrl + "/" + _id + "/" + resetString
      }>here</a> to procced.</p>`,
    };
    const saltRounds = 10;
    const hashedResetString = await bcrypt.hash(resetString, saltRounds);
    const newPasswordReset = new PasswordReset({
      userId: _id,
      resetString: hashedResetString.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newPasswordReset.save();
    await transporter.sendMail(mailOptions);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authRegisterSchema.validateAsync(req.body);

      if (result.code !== process.env.CODE)
        throw createError.NotAcceptable("Code does not match.");

      if (result.password !== result.confirmPassword)
        throw createError.Conflict(
          "Password and password confirm does not match."
        );

      const doesExist = await User.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(
          `${result.email} is already been registered.`
        );

      const user = new User({ ...result, verified: false, role: "user" });
      const savedUser = await user.save();

      await sendVerificationEmail(savedUser, result.currentUrl, res, next);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { userId, uniqueString } = req.params;
      const userVerification = await UserVerification.findOne({ userId });
      if (!userVerification)
        throw createError.NotFound("User not exist or verified already.");
      const {
        expiresAt,
        uniqueString: hashedUniqueString,
        urlRedirect,
      } = userVerification;
      if (expiresAt < Date.now()) {
        await User.deleteOne({ _id: userId });
        throw createError.NotAcceptable("User verifycation is expired.");
      } else {
        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (!isMatch)
          throw createError.Unauthorized("Username/password not exist");
        await User.updateOne({ _id: userId }, { verified: true });
        await UserVerification.deleteOne({ userId });
        const loginString = uuidv4() + userId;
        await UserLogin.deleteMany({ userId });
        const saltRounds = 10;
        const hashedLoginString = await bcrypt.hash(loginString, saltRounds);
        const newUserLogin = new UserLogin({
          userId,
          loginString: hashedLoginString.toString(),
          createdAt: Date.now(),
          expiresAt: Date.now() + 3600000,
        });
        await newUserLogin.save();
        res.redirect(urlRedirect + "/" + userId + "/" + loginString);
      }
    } catch (error) {
      next(error);
    }
  },

  verified: async (req, res, next) => {
    try {
      const { userId, loginString } = req.body;
      const userLogin = await UserLogin.findOne({ userId });
      if (!userLogin)
        throw createError.NotFound("User not exist or login already.");
      const { expiresAt, loginString: hashedLoginString } = userLogin;
      if (expiresAt < Date.now()) {
        await UserLogin.deleteOne({ userId });
        throw createError.NotAcceptable("User login is expired.");
      } else {
        const isMatch = await bcrypt.compare(loginString, hashedLoginString);
        if (!isMatch)
          throw createError.Unauthorized("Username/password not valid");
        const accessToken = await signAccessToken(userId);
        const refreshToken = await signRefreshToken(userId);

        await UserLogin.deleteOne({ userId });
        res.send({ accessToken, refreshToken });
      }
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authLoginSchema.validateAsync(req.body);

      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not registerd");
      if (!user.verified)
        throw createError.BadRequest(
          "Email hasn't been verified yet. Check your inbox."
        );

      const isMatch = await user.isValidPassword(result.password);

      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const newRefreshToken = await signRefreshToken(userId);

      res.send({ accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.params;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      client.DEL(userId, (err, val) => {
        if (err) throw createError.InternalServerError();
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  requestPasswordReset: async (req, res, next) => {
    try {
      const { email, redirectUrl } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw createError.NotFound("User not existed");
      if (!user.verified)
        throw createError.BadRequest(
          "Email hasn't been verified yet. Check your inbox."
        );
      await sendResetEmail(user, redirectUrl, res, next);
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { userId, resetString, newPassword, newConfirmPassword } = req.body;
      if (newPassword !== newConfirmPassword)
        throw createError.Conflict(
          "Password and password confirm does not match."
        );
      const user = await PasswordReset.findOne({ userId });
      if (!user) throw createError.NotFound("Password reset request not found");
      const { expiresAt, resetString: hashedResetString } = user;
      if (expiresAt < Date.now()) {
        await PasswordReset.deleteOne({ userId });
        throw createError.NotAcceptable("Reset password is expired.");
      } else {
        const isMatch = bcrypt.compare(resetString, hashedResetString);
        if (!isMatch)
          throw createError.Unauthorized("Username/password not exist");
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.updateOne({ _id: userId }, { password: hashedNewPassword });
        await PasswordReset.deleteOne({ userId });
        res.status(200).send();
      }
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const doesExist = await User.findById(req.payload.userId);

      if (!doesExist) throw createError.NotFound("User does not exist.");

      res.status(200).json({
        profile: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserList: async (req, res, next) => {
    try {
      const apiFeature = new APIFeature(User.find(), req.query)
        .search()
        .filter();
      let users = await apiFeature.query;
      const filteredCount = users.length;
      apiFeature.sorting().pagination();
      users = await apiFeature.query.clone();

      res.status(200).json({
        filteredCount,
        users,
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const doesExist = await User.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await User.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          updatedAt: Date.now(),
        }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const doesExist = await User.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.DEL(req.params.id, (err, val) => {
        if (err) throw createError.InternalServerError();
      });

      await User.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
