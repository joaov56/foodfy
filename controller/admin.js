const fs = require("fs");
const data = require("../data.json");

exports.index = (req, res) => {
  return res.render("./admin/index", { datas: data.recipes });
};

exports.detail = (req, res) => {
  const { id } = req.params;

  let receita = data.recipes.filter(function (recipe) {
    return recipe.id == id;
  });
  console.log(receita[0].id);
  return res.render("./admin/detail", { data: receita[0] });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  let receita = data.recipes.filter(function (recipe) {
    return recipe.id == id;
  });
  return res.render("./admin/edit", { data: receita[0] });
};

exports.create = (req, res) => {
  return res.render("./admin/create");
};

exports.delete = (req, res) => {
  const { id } = req.body;
  console.log(id);

  const filtered = data.recipes.filter(function (recipe) {
    return recipe.id != id;
  });

  data.recipes = filtered;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send(err);

    return res.redirect("/admin");
  });
};

exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
    if (recipe.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundRecipe) return res.send("Recipe not found");

  const recipe = {
    ...foundRecipe,
    ...req.body,
  };

  data.recipes[index] = recipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send(err);

    return res.redirect(`/admin/recipes/${id}`);
  });
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  let { title, author, image, ingredient, preparation, information } = req.body;

  let id = 1;
  const lastrecipe = data.recipes[data.recipes.length - 1];

  if (lastrecipe) {
    id = lastrecipe.id + 1;
  }

  Number(id);

  data.recipes.push({
    id,
    title,
    author,
    image,
    ingredient,
    preparation,
    information,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error!");

    return res.redirect("/admin");
  });
};
