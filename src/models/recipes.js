const db = require("../config/db");

module.exports = {
  index(callback) {
    db.query(
      `    SELECT recipes.*, chefs.name AS chefs_name
    FROM recipes
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    ORDER BY recipes.id ASC`,
      function (err, results) {
        if (err) throw `${err}`;

        callback(results.rows);
      }
    );
  },
  detail(id, callback) {
    db.query(
      `SELECT recipes.*, chefs.name AS chefs_name
    FROM recipes 
    LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
    WHERE recipes.id= $1`,
      [id],
      function (err, results) {
        if (err) throw `${err}`;
        callback(results.rows[0]);
      }
    );
  },
  create(data, callback) {
    console.log("mec");
    const query = `
        INSERT INTO recipes (
            title,
            image,
            ingredients,
            preparation,
            information,
            created_at,
            chef_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      data.title,
      data.image,
      data.ingredients,
      data.preparation,
      data.information,
      data.created_at,
      data.chef_id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `${err}`;

      callback(results.rows[0]);
    });
  },
  chef_create(callback) {
    db.query(`SELECT * FROM chefs`, function (err, results) {
      if (err) throw `${err}`;

      callback(results.rows);
    });
  },
  edit(data, callback) {
    const query = `
        UPDATE recipes SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        chef_id= ($6)
      `;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef_id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `${err}`;

      callback();
    });
  },
  remove(id, callback) {
    db.query(`DELETE FROM recipes WHERE id= $1`, [id], function (err, results) {
      if (err) throw `${err}`;

      callback();
    });
  },
};
