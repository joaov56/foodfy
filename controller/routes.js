const express = require("express");
const routes = express.Router();
const data = require("../data");
const user = require("./user");
const admin = require("./admin");

// USER AREA

routes.get("/", user.index);

routes.get("/receitas", user.recipes);

routes.get("/about", user.about);

routes.get("/recipes/:id", user.detail);

// ADMIN AREA

routes.get("/admin", admin.index);

routes.get("/admin/recipes/:id", admin.detail);

routes.get("/admin/recipes/:id/edit", admin.edit);

routes.get("/admin/create", admin.create);

routes.put("/admin/recipes", admin.put);

routes.delete("/admin/recipes", admin.delete);

routes.post("/admin/recipes", admin.post);

module.exports = routes;
