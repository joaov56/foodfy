const fs = require("fs");
const data = require("../data.json");

exports.index = (req, res) => {
  return res.render("./admin/index", { datas: data.recipes });
};

exports.detail = (req, res) => {
  const { id } = req.params;
  return res.render("./admin/detail", { data: data.recipes[id] });
};
