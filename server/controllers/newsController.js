const News = require("../models/newsModel");
const NewsItem = require("../models/newsItemModel");
const Year = require("../models/yearModel");
const createError = require("http-errors");
const client = require("../helpers/initRedis");
const APIFeatures = require("../utils/apiFeatures");
const fs = require("fs");

module.exports = {
  createNews: async (req, res, next) => {
    try {
      const year = String(req.body.day).split("/")[2];
      const yearExist = await Year.find({ year: year });

      const news = await News.create({
        ...req.body,
        vi: {
          title: req.body.vi.title,
          description: req.body.vi.description,
          poster: req.files["viPoster"][0].path,
        },
        jp: {
          title: req.body.jp.title,
          description: req.body.jp.description,
          poster: req.files["jpPoster"][0].path,
        },
      });

      if (yearExist.length === 0)
        await Year.create({
          year: year,
          totalNews: 1,
        });
      else
        await Year.updateOne(
          { year: year },
          { totalNews: yearExist[0].totalNews + 1 }
        );

      res.status(201).json({ id: news._id });
    } catch (error) {
      next(error);
    }
  },

  createNewsItem: async (req, res, next) => {
    try {
      const doesExist = await News.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.NEWS_KEY + req.params.id);

      const imageGroupInput = req.files.filter(
        (image) => image.fieldname === "imageGroup[]"
      );

      let imageGroup = [];

      for (const image of imageGroupInput) {
        imageGroup.push({ url: image.path });
      }

      const newsItem = await NewsItem.create({
        ...req.body,
        imageGroup,
        imageCenter: req.files.find(
          (image) => image.fieldname === "imageCenter"
        )?.path,
        imageLeft: req.files.find((image) => image.fieldname === "imageLeft")
          ?.path,
        imageRight: req.files.find((image) => image.fieldname === "imageRight")
          ?.path,
        video: req.files.find((image) => image.fieldname === "video")?.path,
        pdf: req.files.find((image) => image.fieldname === "pdf")?.path,
      });

      if (req.params.lang === "vi") {
        doesExist.vi.news.push({ id: newsItem._id });
        await News.updateOne(
          { _id: req.params.id },
          {
            vi: {
              ...doesExist.vi,
              news: doesExist.vi.news,
            },
          }
        );
      } else {
        doesExist.jp.news.push({ id: newsItem._id });
        await News.updateOne(
          { _id: req.params.id },
          {
            jp: {
              ...doesExist.jp,
              news: doesExist.jp.news,
            },
          }
        );
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  updateNewsItem: async (req, res, next) => {
    try {
      const doesExist = await NewsItem.findById(req.params.newsItemId);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.NEWS_KEY + req.params.newsId);

      const imageGroupInput = req.files.filter(
        (image) => image.fieldname === "imageGroup[]"
      );

      let imageGroup = [];

      if (imageGroupInput.length > 0) {
        for (const item of doesExist.imageGroup) {
          fs.unlinkSync(item.url);
        }
      }

      for (const image of imageGroupInput) {
        imageGroup.push({ url: image.path });
      }
      if (
        (req.files.find((image) => image.fieldname === "imageCenter") ||
          !req.body.imageCenter) &&
        doesExist.imageCenter
      )
        fs.unlinkSync(doesExist?.imageCenter);
      if (
        (req.files.find((image) => image.fieldname === "imageLeft") ||
          !req.body.imageLeft) &&
        doesExist.imageLeft
      )
        fs.unlinkSync(doesExist?.imageLeft);
      if (
        (req.files.find((image) => image.fieldname === "imageRight") ||
          !req.body.imageRight) &&
        doesExist.imageRight
      )
        fs.unlinkSync(doesExist?.imageRight);
      if (
        (req.files.find((image) => image.fieldname === "video") ||
          !req.body.video) &&
        doesExist.video
      )
        fs.unlinkSync(doesExist?.video);
      if (
        (req.files.find((image) => image.fieldname === "pdf") ||
          !req.body.pdf) &&
        doesExist.pdf
      )
        fs.unlinkSync(doesExist?.pdf);

      await NewsItem.updateOne(
        { _id: req.params.newsItemId },
        {
          content: req.body.content || null,
          contentCenter: req.body.contentCenter || null,
          linkGroup: req.body.linkGroup || null,
          table: req.body.table || null,
          youtube: req.body.youtube || null,
          imageGroup:
            imageGroupInput.length > 0 ? imageGroup : doesExist.imageGroup,
          imageCenter:
            req.files.find((image) => image.fieldname === "imageCenter")
              ?.path ||
            req.body.imageCenter ||
            null,
          imageLeft:
            req.files.find((image) => image.fieldname === "imageLeft")?.path ||
            req.body.imageLeft ||
            null,
          imageRight:
            req.files.find((image) => image.fieldname === "imageRight")?.path ||
            req.body.imageRight ||
            null,
          video:
            req.files.find((image) => image.fieldname === "video")?.path ||
            req.body.video ||
            null,
          pdf:
            req.files.find((image) => image.fieldname === "pdf")?.path ||
            req.body.pdf ||
            null,
        }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  deleteNewsItem: async (req, res, next) => {
    try {
      const newsExist = await News.findById(req.params.newsId);
      if (!newsExist) throw createError.NotFound();

      const newsItemExist = await NewsItem.findById(req.params.newsItemId);
      if (!newsItemExist) throw createError.NotFound();

      await client.del(process.env.NEWS_KEY + req.params.newsId);

      if (newsItemExist.imageCenter) fs.unlinkSync(newsItemExist.imageCenter);
      if (newsItemExist.imageLeft) fs.unlinkSync(newsItemExist.imageLeft);
      if (newsItemExist.imageRight) fs.unlinkSync(newsItemExist.imageRight);
      if (newsItemExist.imageGroup.length > 0)
        for (const item of newsItemExist.imageGroup) fs.unlinkSync(item.url);
      if (newsItemExist.video) fs.unlinkSync(newsItemExist.video);
      if (newsItemExist.pdf) fs.unlinkSync(newsItemExist.pdf);

      await NewsItem.deleteOne({ _id: req.params.newsItemId });

      newsExist.vi.news = newsExist.vi.news.filter(
        (item) => item.id.toString() !== req.params.newsItemId
      );
      newsExist.jp.news = newsExist.jp.news.filter(
        (item) => item.id.toString() !== req.params.newsItemId
      );

      await News.updateOne(
        {
          _id: req.params.newsId,
        },
        {
          vi: {
            ...newsExist.vi,
            news: newsExist.vi.news,
          },
          jp: {
            ...newsExist.jp,
            news: newsExist.jp.news,
          },
        }
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  updateNews: async (req, res, next) => {
    try {
      const doesExist = await News.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.NEWS_KEY + req.params.id);

      if (req.body.day) {
        const newYear = String(req.body.day).split("/")[2];
        const oldYear = String(doesExist.day).split("/")[2];
        if (newYear !== oldYear) {
          const yearExist = await Year.find({ year: oldYear });
          if (yearExist[0].totalNews <= 1) {
            await Year.deleteOne({ year: oldYear });
            await Year.create({
              year: newYear,
              totalNews: 1,
            });
          } else {
            await Year.updateOne(
              { year: oldYear },
              { totalNews: yearExist[0].totalNews - 1 }
            );
          }
        }
      }

      if (req.files["viPoster"]) fs.unlinkSync(doesExist.vi.poster);
      if (req.files["jpPoster"]) fs.unlinkSync(doesExist.jp.poster);

      await News.updateOne(
        { _id: req.params.id },
        {
          ...req.body,
          vi: {
            ...doesExist.vi,
            poster: req.files["viPoster"]
              ? req.files["viPoster"][0].path
              : doesExist.vi.poster,
            ...req.body.vi,
          },
          jp: {
            ...doesExist.jp,
            poster: req.files["jpPoster"]
              ? req.files["jpPoster"][0].path
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

  getNewsDetail: async (req, res, next) => {
    try {
      const doesExist = await News.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({ news: doesExist });
    } catch (error) {
      next(error);
    }
  },

  getNewsDetailFull: async (req, res, next) => {
    try {
      const doesExist = await News.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      const response = JSON.parse(
        await client.get(process.env.NEWS_KEY + req.params.id)
      );

      if (response) {
        res.status(200).send(response);
      } else {
        let newsVi = [];
        let newsJp = [];

        if (doesExist.vi.news.length > 0) {
          for (const item of doesExist.vi.news) {
            const newsItem = await NewsItem.findById(item.id);
            newsVi.push(newsItem);
          }
        }
        if (doesExist.jp.news.length > 0) {
          for (const item of doesExist.jp.news) {
            const newsItem = await NewsItem.findById(item.id);
            newsJp.push(newsItem);
          }
        }

        await client.set(
          process.env.NEWS_KEY + req.params.id,
          JSON.stringify({
            newsDetail: doesExist,
            newsVi,
            newsJp,
          })
        );

        res.status(200).json({ newsDetail: doesExist, newsVi, newsJp });
      }
    } catch (error) {
      next(error);
    }
  },

  getNewsItemDetail: async (req, res, next) => {
    try {
      const doesExist = await NewsItem.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      res.status(200).json({ newsItem: doesExist });
    } catch (error) {
      next(error);
    }
  },

  getNewsList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(News.find(), req.query)
        .search()
        .filter()
        .sorting();
      let newss = await apiFeatures.query;
      const filteredCount = newss.length;
      apiFeatures.pagination();
      newss = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        newss,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteNews: async (req, res, next) => {
    try {
      const doesExist = await News.findById(req.params.id);

      if (!doesExist) throw createError.NotFound();

      await client.del(process.env.NEWS_KEY + req.params.id);

      fs.unlinkSync(doesExist.vi.poster);
      fs.unlinkSync(doesExist.jp.poster);

      const year = String(doesExist.day).split("/")[2];
      const yearExist = await Year.find({ year: year });

      if (yearExist[0].totalNews > 1)
        await Year.updateOne(
          { year: year },
          { totalNews: yearExist[0].totalNews - 1 }
        );
      else await Year.deleteOne({ _id: req.params.id });

      if (doesExist?.vi?.news.length > 0) {
        for (const news of doesExist.vi.news) {
          const newsExist = await NewsItem.findById(news.id);
          if (newsExist.imageCenter) fs.unlinkSync(newsExist.imageCenter);
          if (newsExist.imageLeft) fs.unlinkSync(newsExist.imageLeft);
          if (newsExist.imageRight) fs.unlinkSync(newsExist.imageRight);
          if (newsExist.video) fs.unlinkSync(newsExist.video);
          if (newsExist.pdf) fs.unlinkSync(newsExist.pdf);
          if (newsExist.imageGroup.length > 0)
            for (const item of newsExist.imageGroup) fs.unlinkSync(item.url);
          await NewsItem.deleteOne({ _id: news.id });
        }
      }

      if (doesExist?.jp?.news.length > 0) {
        for (const news of doesExist.jp.news) {
          const newsExist = await NewsItem.findById(news.id);
          if (newsExist.imageCenter) fs.unlinkSync(newsExist.imageCenter);
          if (newsExist.imageLeft) fs.unlinkSync(newsExist.imageLeft);
          if (newsExist.imageRight) fs.unlinkSync(newsExist.imageRight);
          if (newsExist.video) fs.unlinkSync(newsExist.video);
          if (newsExist.pdf) fs.unlinkSync(newsExist.pdf);
          if (newsExist.imageGroup.length > 0)
            for (const item of newsExist.imageGroup) fs.unlinkSync(item.url);
          await NewsItem.deleteOne({ _id: news.id });
        }
      }

      await News.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  getAllYear: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Year.find(), req.query).sorting();
      const years = await apiFeatures.query;

      res.status(200).json({ years });
    } catch (error) {
      next(error);
    }
  },
};
