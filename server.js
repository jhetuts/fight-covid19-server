const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();
// middleware
const { notFound, errorHandler } = require("./src/middlewares");

// routes
const auth = require("./src/api/auth");
const logs = require("./src/api/logs");

mongoose
  .connect(process.env.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Passport
app.use(passport.initialize());
require("./src/config/passport")(passport);

app.use(helmet());
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/logs", logs);

app.get("/", (req, res) => {
  res.json({
    message: "API Version 1.0.0",
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
