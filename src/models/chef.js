const db = require("../config/db");

module.exports = {
  list(callback) {
    db.query(`SELECT * FROM chefs`, function (err, results) {
      if (err) throw `${err}`;

      callback(results.rows);
    });
  },

  detail(id, callback) {
    db.query(
      `    SELECT chefs.* ,count(recipes) AS total_recipes
    FROM chefs
    LEFT JOIN recipes ON (chefs.id = recipes.chef_id) WHERE chefs.id= $1
    GROUP BY chefs.id   
`,
      [id],
      function (err, results) {
        if (err) throw `${err}`;

        callback(results.rows[0]);
      }
    );
  },

  show_recipes(id, callback) {
    db.query(
      ` SELECT * FROM recipes WHERE recipes.chef_id= $1 `,
      [id],
      function (err, results) {
        if (err) throw `${err}`;

        callback(results.rows);
      }
    );
  },
};
