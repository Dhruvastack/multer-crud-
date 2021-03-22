const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const router = express.Router();
// create express app
const app = express();
const photo = require("./photo/routes");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.js");
const mongoose = require("mongoose");
const { storage } = require("./storage");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./users/routes.js")(app);
app.use("/photo", photo);
// app.use("/photo/:id", photo);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
