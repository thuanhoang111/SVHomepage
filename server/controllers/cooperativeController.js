const Cooperative = require("../models/cooperativeModel");
const createError = require("http-errors");
const client = require("../helpers/initRedis");
const APIFeatures = require("../utils/apiFeatures");
const fs = require("fs");

module.exports = {
  createCooperative: async (req, res, next) => {
    try {
      await Cooperative.create({
        image: req.file.path,
        ...req.body,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  deleteCooperative: async (req, res, next) => {
    try {
      const doesExist = await Cooperative.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await Cooperative.deleteOne({ _id: req.params.id });
      fs.unlinkSync(doesExist.image);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  updateCooperative: async (req, res, next) => {
    try {
      const doesExist = await Cooperative.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();
      if (req.file) fs.unlinkSync(doesExist.image);

      await Cooperative.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          updatedAt: Date.now(),
          image: req.file ? req.file.path : doesExist.image,
        }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  getCooperativeList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Cooperative.find(), req.query)
        .search()
        .filter();
      let cooperatives = await apiFeatures.query;
      const filteredCount = cooperatives.length;
      apiFeatures.sorting().pagination();
      cooperatives = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        cooperatives,
      });
    } catch (error) {
      next(error);
    }
  },
};
