const Personnel = require("../models/personnelModel");
const createError = require("http-errors");
const APIFeature = require("../utils/apiFeatures");
const fs = require("fs");

module.exports = {
  createPersonnel: async (req, res, next) => {
    try {
      await Personnel.create({
        avatar: req.file.path,
        ...req.body,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  updatePersonnel: async (req, res, next) => {
    try {
      const doesExist = await Personnel.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();
      if (req.file) fs.unlinkSync(doesExist.avatar);

      await Personnel.updateOne(
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

  deletePersonnel: async (req, res, next) => {
    try {
      const doesExist = await Personnel.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await Personnel.deleteOne({ _id: req.params.id });
      fs.unlinkSync(doesExist.avatar);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  getPersonnelDetail: async (req, res, next) => {
    try {
      const doesExist = await Personnel.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({
        personnel: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getPersonnelList: async (req, res, next) => {
    try {
      const apiFeature = new APIFeature(Personnel.find(), req.query)
        .search()
        .filter();
      let personnels = apiFeature.query;
      const filteredCount = personnels.length;
      apiFeature.sorting().pagination();
      personnels = await apiFeature.query.clone();

      res.status(200).json({
        filteredCount,
        personnels,
      });
    } catch (error) {
      next(error);
    }
  },
};
