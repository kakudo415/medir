const db = require("../db");

class Dir {

  static find(id) {
    return new Promise((resole, reject) => {
      let query = "SELECT * FROM `dirs` WHERE id = ? LIMIT 1";

      db.query(query, [id], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(new Dir(res[0]));
      });
    });
  }

  static create(parent, name) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `dirs` (parent_id, name) VALUES (?, ?)";

      db.query(query, [parent, name], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(res.insertId);
      });
    });
  }

  constructor(info) {
    this.id = info.id;
    this.parent_id = info.parent_id;
    this.name = info.name;
  }

  childFinds() {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM `dirs` WHERE parent_id = ?";

      db.query(query, [this.id], (err, res) => {
        
      });
    });
  }
}

module.exports = Dir;
