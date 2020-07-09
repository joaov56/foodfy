const fs = require("fs");
const data = require("../data.json");

exports.index = (req, res) => {
  return res.render("index");
};
