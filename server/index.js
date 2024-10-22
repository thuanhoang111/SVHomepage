const express = require("express");
const cros = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
require("./helpers/initMongodb");
//require("./helpers/initRedis");

const auth = require("./routes/authRoute");
const partner = require("./routes/partnerRoute");
const contact = require("./routes/contactRoute");
const feedback = require("./routes/feedbackRoute");
const cooperative = require("./routes/cooperativeRoute");
const news = require("./routes/newsRoute");
const agriculture = require("./routes/agricultureRoute");
const email = require("./routes/emailRoute");
const personnel = require("./routes/personnelRoute");

const app = express();

app.use(
  cros({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIOND",
  })
);
app.use("/uploads", express.static("./uploads"));
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", auth);
app.use("/partner", partner);
app.use("/contact", contact);
app.use("/feedback", feedback);
app.use("/cooperative", cooperative);
app.use("/news", news);
app.use("/agriculture", agriculture);
app.use("/email", email);
app.use("/personnel", personnel);

app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server started on PORT: ${PORT} in ${process.env.NODE_ENV}mode.`
  );
});
