const fs = require("fs");
const data = require("../data.json");

exports.index = (req, res) => {
  console.log(data);

  return res.render("./user/index", { datas: data.recipes });
};

exports.about = (req, res) => {
  return res.render("./user/sobre");
};

exports.recipes = (req, res) => {
  return res.render("./user/receitas", { datas: data.recipes });
};

exports.detail = (req, res) => {
  const recipeIndex = req.params.id;

  let receita = data.recipes.filter(function (recipe) {
    return recipe.id == recipeIndex;
  });

  console.log(receita);

  return res.render("./user/details", { item: receita[0] });
};
