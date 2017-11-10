const db = require("../db");
const Dir = require("./dir");

class Room {
  static find(name) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM `rooms` WHERE `name` = ? LIMIT 1";

      db.query(query, [name], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        if(res.length == 0) {
          resolve(false);
          return;
        }

        resolve(new Room(res[0]));
      });
    });
  }

  static create(name) {
    return new Promise((resolve, reject) => {
      Dir.create(null, "root").then((insertId) => {
        let query = "INSERT INTO `rooms` (name, root_id, created_at) VALUES (?, ?, ?)";

        db.query(query, [name, insertId, new Date()], (err, res) => {
          if(err) {
            reject(err);
            return;
          }

          resolve();
        })
      }).catch((err) => {
        reject(err);
      })
    })
  }

  constructor(info) {
    this.id = info.id;
    this.root_id = info.root_id;
    this.created_at = info.created_at;
  }
}


module.exports = Room;
