const multer = require("multer");
const fs = require("fs");

exports.upload = (folder) => {
  return (upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        if (!fs.existsSync(`uploads/${folder}`)) {
          fs.mkdirSync(`uploads/${folder}`, { recursive: true });
        }
        cb(null, `uploads/${folder}`);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `admin-${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }));
};
