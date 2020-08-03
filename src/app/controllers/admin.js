const fs = require("fs");
const recipes = require("../../models/recipes");
const chef = require("../../models/chef");

//RECIPES
exports.index = (req, res) => {
  recipes.index(function (datas) {
    console.log(datas);

    return res.render("./admin/index", { datas });
  });
};

exports.detail = (req, res) => {
  const { id } = req.params;

  recipes.detail(id, function (data) {
    return res.render("./admin/detail", { data });
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  chef.list(function (chefs) {
    recipes.detail(id, function (data) {
      return res.render("./admin/edit", { data, chefs });
    });
  });
};

exports.create = (req, res) => {
  recipes.chef_create(function (chefs) {
    console.log(chefs);
    return res.render("./admin/create", { chefs });
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  recipes.remove(id, function () {
    return res.redirect("/admin");
  });
};

exports.put = (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  recipes.edit(req.body, function (recipe) {
    return res.redirect(`/admin/recipes/${id}`);
  });
};

exports.post = (req, res) => {
  recipes.create(req.body, function (recipe) {
    return res.redirect(`/admin`);
  });
};

//CHEFS

exports.chef = (req, res) => {
  chef.list(function (chefs) {
    return res.render("./admin/chefs", { chefs });
  });
};

exports.detail_chef = (req, res) => {
  const { id } = req.params;
  chef.show_recipes(id, function (recipes) {
    chef.list(id, function (chef) {
      return res.render("./admin/chef_detail", { recipes, chef });
    });
  });
};
