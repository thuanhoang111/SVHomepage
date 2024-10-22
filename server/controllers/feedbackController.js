const APIFeatures = require("../utils/apiFeatures");
const createError = require("http-errors");
const Feedback = require("../models/feedbackModel");
const fs = require("fs");

module.exports = {
  createFeedback: async (req, res, next) => {
    try {
      await Feedback.create({
        avatar: req.file.path,
        ...req.body,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  updateFeedback: async (req, res, next) => {
    try {
      const doesExist = await Feedback.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();
      if (req.file) fs.unlinkSync(doesExist.avatar);

      await Feedback.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          updatedAt: Date.now(),
          avatar: req.file ? req.file.path : doesExist.avatar,
        }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteFeedback: async (req, res, next) => {
    try {
      const doesExist = await Feedback.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await Feedback.deleteOne({ _id: req.params.id });
      fs.unlinkSync(doesExist.avatar);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  getFeedbackDetail: async (req, res, next) => {
    try {
      const doesExist = await Feedback.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({
        feedback: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getFeedbackList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Feedback.find(), req.query)
        .search()
        .filter();
      let feedbacks = apiFeatures.query;
      const filteredCount = feedbacks.length;
      apiFeatures.sorting().pagination();
      feedbacks = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        feedbacks,
      });
    } catch (error) {
      next(error);
    }
  },
};
