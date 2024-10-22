const Tag = require("../models/tagModel");
const Agriculture = require("../models/agricultureModel");
const AgricultureItem = require("../models/agricultureItemModel");
const client = require("../helpers/initRedis");
const APIFeatures = require("../utils/apiFeatures");
const createError = require("http-errors");
const fs = require("fs");

module.exports = {
  createAgriculture: async (req, res, next) => {
    try {
      const agriculture = await Agriculture.create({
        ...req.body,
        vi: {
          ...req.body.vi,
          poster: req.files["viPoster"][0]?.path,
        },
        jp: {
          ...req.body.jp,
          poster: req.files["jpPoster"][0]?.path,
        },
      });

      res.status(201).json({ id: agriculture._id });
    } catch (error) {
      next(error);
    }
  },

  createAgricultureItem: async (req, res, next) => {
    try {
      const doesExist = await Agriculture.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.AGRICULTURE_KEY + req.params.id);

      const agricultureItem = await AgricultureItem.create({
        ...req.body,
        image: req.files["image"] && req.files["image"][0]?.path,
        video: req.files["video"] && req.files["video"][0]?.path,
        pdf: req.files["pdf"] && req.files["pdf"][0]?.path,
      });

      if (req.params.lang === "vi") {
        doesExist.vi.agriculture.push({ id: agricultureItem._id });
        await Agriculture.updateOne(
          { _id: req.params.id },
          {
            vi: {
              ...doesExist.vi,
              agriculture: doesExist.vi.agriculture,
            },
          }
        );
      } else {
        doesExist.jp.agriculture.push({ id: agricultureItem._id });
        await Agriculture.updateOne(
          { _id: req.params.id },
          {
            jp: {
              ...doesExist.jp,
              agriculture: doesExist.jp.agriculture,
            },
          }
        );
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  updateAgriculture: async (req, res, next) => {
    try {
      const doesExist = await Agriculture.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.AGRICULTURE_KEY + req.params.id);

      if (req.files["viPoster"]) fs.unlinkSync(doesExist.vi.poster);
      if (req.files["jpPoster"]) fs.unlinkSync(doesExist.jp.poster);

      await Agriculture.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          vi: {
            ...doesExist.vi,
            poster: req.files["viPoster"]
              ? req.files["viPoster"][0]?.path
              : doesExist.vi.poster,
            ...req.body.vi,
          },
          jp: {
            ...doesExist.jp,
            poster: req.files["jpPoster"]
              ? req.files["jpPoster"][0]?.path
              : doesExist.jp.poster,
            ...req.body.jp,
          },
          updatedAt: Date.now(),
        }
      );

      res.status(200).json({ id: req.params.id });
    } catch (error) {
      next(error);
    }
  },

  updateAgricultureItem: async (req, res, next) => {
    try {
      const doesExist = await AgricultureItem.findById(
        req.params.agricultureItemId
      );

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.AGRICULTURE_KEY + req.params.agricultureId);

      if ((req.files["image"] || !req.body.image) && doesExist.image)
        fs.unlinkSync(doesExist?.image);
      if ((req.files["video"] || !req.body.video) && doesExist.video)
        fs.unlinkSync(doesExist?.video);
      if ((req.files["pdf"] || !req.body.pdf) && doesExist.pdf)
        fs.unlinkSync(doesExist?.pdf);

      await AgricultureItem.updateOne(
        { _id: req.params.agricultureItemId },
        {
          title: req.body.title || null,
          topContent: req.body.topContent || null,
          italicContent: req.body.italicContent || null,
          youtube: req.body.youtube || null,
          linkGroup: req.body.linkGroup || null,
          bottomContent: req.body.bottomContent || null,
          image: req.files["image"]
            ? req.files["image"][0].path
            : req.body.image || null,
          video: req.files["video"]
            ? req.files["video"][0].path
            : req.body.video || null,
          pdf: req.files["pdf"]
            ? req.files["pdf"][0].path
            : req.body.pdf || null,
        }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteAgriculture: async (req, res, next) => {
    try {
      const doesExist = await Agriculture.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.AGRICULTURE_KEY + req.params.id);

      fs.unlinkSync(doesExist.vi.poster);
      fs.unlinkSync(doesExist.jp.poster);

      if (doesExist?.vi?.agriculture.length > 0) {
        for (const agriculture of doesExist.vi.agriculture) {
          const agricultureExist = await AgricultureItem.findById(
            agriculture.id
          );
          fs.unlinkSync(agricultureExist?.image);
          fs.unlinkSync(agricultureExist?.video);
          fs.unlinkSync(agricultureExist?.pdf);
          await AgricultureItem.deleteOne({ _id: agriculture.id });
        }
      }

      if (doesExist?.jp?.agriculture.length > 0) {
        for (const agriculture of doesExist.jp.agriculture) {
          const agricultureExist = await AgricultureItem.findById(
            agriculture.id
          );
          fs.unlinkSync(agricultureExist?.image);
          fs.unlinkSync(agricultureExist?.video);
          fs.unlinkSync(agricultureExist?.pdf);
          await AgricultureItem.deleteOne({ _id: agriculture.id });
        }
      }

      await Agriculture.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  deleteAgricultureItem: async (req, res, next) => {
    try {
      const agricultureExist = await Agriculture.findById(
        req.params.agricultureId
      );
      if (!agricultureExist) throw createError.NotFound();

      const agricultureItemExist = await AgricultureItem.findById(
        req.params.agricultureItemId
      );
      if (!agricultureItemExist) throw createError.NotFound();

      await client.del(process.env.AGRICULTURE_KEY + req.params.agricultureId);

      if (agricultureItemExist.image)
        fs.unlinkSync(agricultureItemExist?.image);
      if (agricultureItemExist.video)
        fs.unlinkSync(agricultureItemExist?.video);
      if (agricultureItemExist.pdf) fs.unlinkSync(agricultureItemExist?.pdf);

      await AgricultureItem.deleteOne({ _id: req.params.agricultureItemId });

      agricultureExist.vi.agriculture = agricultureExist.vi.agriculture.filter(
        (item) => item.id.toString() !== req.params.agricultureItemId
      );
      agricultureExist.jp.agriculture = agricultureExist.jp.agriculture.filter(
        (item) => item.id.toString() !== req.params.agricultureItemId
      );

      await Agriculture.updateOne(
        { _id: req.params.agricultureId },
        {
          vi: {
            ...agricultureExist.vi,
            agriculture: agricultureExist.vi.agriculture,
          },
          jp: {
            ...agricultureExist.jp,
            agriculture: agricultureExist.jp.agriculture,
          },
        }
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  getAgricultureItemDetail: async (req, res, next) => {
    try {
      const doesExist = await AgricultureItem.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({
        agricultureItem: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getAgricultureDetail: async (req, res, next) => {
    try {
      const doesExist = await Agriculture.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      let viTag = [];
      let jpTag = [];

      if (doesExist.vi.tag.length > 0)
        for (const item of doesExist.vi.tag) {
          const tagItem = await Tag.find({ vi: item });
          viTag.push(tagItem[0]);
        }
      if (doesExist.jp.tag.length > 0)
        for (const item of doesExist.jp.tag) {
          const tagItem = await Tag.find({ jp: item });
          jpTag.push(tagItem[0]);
        }

      res.status(200).json({ agriculture: doesExist, viTag, jpTag });
    } catch (error) {
      next(error);
    }
  },

  getAgricultureDetailFull: async (req, res, next) => {
    try {
      const doesExist = await Agriculture.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      const response = JSON.parse(
        await client.get(process.env.AGRICULTURE_KEY + req.params.id)
      );

      if (response) {
        res.status(200).send(response);
      } else {
        let agricultureVi = [];
        let agricultureJp = [];

        if (doesExist.vi.agriculture.length > 0)
          for (const item of doesExist.vi.agriculture) {
            const agricultureItem = await AgricultureItem.findById(item.id);
            agricultureVi.push(agricultureItem);
          }
        if (doesExist.jp.agriculture.length > 0)
          for (const item of doesExist.jp.agriculture) {
            const agricultureItem = await AgricultureItem.findById(item.id);
            agricultureJp.push(agricultureItem);
          }

        await client.set(
          process.env.AGRICULTURE_KEY + req.params.id,
          JSON.stringify({
            agricultureDetail: doesExist,
            agricultureVi,
            agricultureJp,
          })
        );

        res
          .status(200)
          .json({ agricultureDetail: doesExist, agricultureVi, agricultureJp });
      }
    } catch (error) {
      next(error);
    }
  },

  getAgricultureList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(
        Agriculture.find(
          req.params.tag
            ? req.params.lang === "vi"
              ? {
                  "vi.tag": req.params.tag,
                }
              : {
                  "jp.tag": req.params.tag,
                }
            : {}
        ),
        req.query
      )
        .filter()
        .sorting();
      let agricultures = await apiFeatures.query;
      const filteredCount = agricultures.length;
      apiFeatures.pagination();
      agricultures = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        agricultures,
      });
    } catch (error) {
      next(error);
    }
  },

  createTag: async (req, res, next) => {
    try {
      await Tag.create({ ...req.body });

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  updateTag: async (req, res, next) => {
    try {
      const doesExist = await Tag.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await Tag.updateOne(
        { _id: req.params.id },
        { ...req.body, updatedAt: Date.now() }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteTag: async (req, res, next) => {
    try {
      const doesExist = await Tag.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await Tag.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  getTagDetail: async (req, res, next) => {
    try {
      const doesExist = await Tag.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({
        tag: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getTagList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Tag.find(), req.query)
        .search()
        .filter();

      let tags = await apiFeatures.query;
      const filteredCount = tags.length;
      apiFeatures.sorting().pagination();
      tags = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        tags,
      });
    } catch (error) {
      next(error);
    }
  },
};
