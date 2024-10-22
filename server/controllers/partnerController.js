const Partner = require("../models/partnerModel");
const createError = require("http-errors");
const client = require("../helpers/initRedis");
const APIFeatures = require("../utils/apiFeatures");
const fs = require("fs");

module.exports = {
  createPartner: async (req, res, next) => {
    try {
      await Partner.create({
        image: req.file.path,
        ...req.body,
      });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  deletePartner: async (req, res, next) => {
    try {
      const doesExist = await Partner.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await Partner.deleteOne({ _id: req.params.id });
      fs.unlinkSync(doesExist.image);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  updatePartner: async (req, res, next) => {
    try {
      const doesExist = await Partner.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();
      if (req.file) fs.unlinkSync(doesExist.image);

      await Partner.updateOne(
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

  getPartnerList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Partner.find(), req.query)
        .search()
        .filter();
      let partners = await apiFeatures.query;
      const filteredCount = partners.length;
      apiFeatures.sorting().pagination();
      partners = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        partners,
      });
    } catch (error) {
      next(error);
    }
  },
};
