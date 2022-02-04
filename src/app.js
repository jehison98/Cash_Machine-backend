const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/index");
require("./database/config");

const app = express();

//CORS
app.use(cors());

//Public Folder
app.use(express.static(path.resolve(__dirname, "public")));

//middlewares
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://cash-machine-omnidoc.herokuapp.com/"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api", routes);

//If not found a route redirect to index.html
app.use("*", (req, res) => {
  // Invalid request
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

module.exports = app;
