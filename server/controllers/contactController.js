const Contact = require("../models/contactModel");
const createError = require("http-errors");
const APIFeature = require("../utils/apiFeatures");

module.exports = {
  createContact: async (req, res, next) => {
    try {
      if (req.body.default === true) {
        await Contact.updateMany({}, { default: false });
      }
      const contacts = await Contact.find();
      await Contact.create({
        ...req.body,
        default: contacts.length === 0 ? true : req.body.default,
      });
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  updateContact: async (req, res, next) => {
    try {
      const doesExist = await Contact.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      if (doesExist.default === true && req.body.default === false)
        throw createError.NotAcceptable();

      if (req.body.default === true) {
        await Contact.updateMany({}, { default: false });
      }

      const contacts = await Contact.find();

      await Contact.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          default: contacts.length === 1 ? true : req.body.default,
          updatedAt: Date.now(),
        }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteContact: async (req, res, next) => {
    try {
      const doesExist = await Contact.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      const contacts = await Contact.find();

      if (contacts.length === 0 || doesExist.default === true)
        throw createError.NotAcceptable();

      await Contact.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  getContactDetail: async (req, res, next) => {
    try {
      const doesExist = await Contact.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({
        contact: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getContactList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeature(Contact.find(), req.query)
        .search()
        .filter();
      let contacts = await apiFeatures.query;
      const filteredCount = contacts.length;
      apiFeatures.sorting().pagination();
      contacts = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        contacts,
      });
    } catch (error) {
      next(error);
    }
  },
};
