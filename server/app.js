const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// router import are here

// security middleware connection
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// security middleware setup
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());

// express middleware setup
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

// body parser setup are here
app.use(bodyParser.json());

// rate limiter are here
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// router setup are here

// base home router handler

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// others router handler
// app.use("/api/v1");

// 404 error router handler

app.use("*", (req, res) => {
  res.status(404).json({ status: "failed", message: "Not Data Found" });
});

module.exports = app;
