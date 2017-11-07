const db = require("../db");

class Dir {
  static create(parent, name) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `dirs` (parent_id, name) VALUES (?, ?)";

      db.query(query, [parent, name], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(res.insertId);
      })
    });
  }
}

module.exports = Dir;
