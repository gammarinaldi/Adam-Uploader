const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const debug = require('debug')('myapp:server');
const path = require('path');

let routes = app => {
  router.get("/", homeController.getHome);

  router.post("/upload", uploadController.uploadFile);

  return app.use("/", router);
};

module.exports = routes;