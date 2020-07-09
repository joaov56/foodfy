const express = require("express");
const routes = express.Router();
const data = require("../data");
const user = require("./user");

// USER AREA

routes.get("/", user.index);

routes.get("/receitas", user.recipes);

routes.get("/about", user.about);

routes.get("/recipes/:id", user.detail);

module.exports = routes;
