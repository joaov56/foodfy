const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

server.use(express.static("public"));
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  noCache: true,
});

const data = require("./data");

server.get("/", (req, res) => {
  return res.render("index", { data: data });
});

server.get("/receitas", (req, res) => {
  return res.render("receitas", { data: data });
});

server.get("/about", (req, res) => {
  return res.render("sobre");
});

server.get("/recipes/:id", function (req, res) {
  const recipeIndex = req.params.id;

  return res.render("details", { item: data[recipeIndex] });
});

server.listen(5000);
