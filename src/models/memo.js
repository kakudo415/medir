const db = require("../db");

class Memo {

  static find(id) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM `memos` WHERE id = ? LIMIT 1";

      db.query(query, [id], (err, res) => {
        if(err) {
          reject(err);
          return;
        }
        resolve(new Memo(res[0]));
      });
    });
  }

  static create(parent, name) {
    return new Promise((resolve, reject) => {
      let query = "INSERT INTO `memos` (parent_id, name, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
      let date = new Date();

      db.query(query, [parent, name, '', date, date], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(res.insertId);
      });
    });
  }


  static commonParentFinds(id) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM `memos` WHERE parent_id = ?";

      db.query(query, [id], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve(res);
      });
    });
  }


  constructor(info) {
    this.id = info.id;
    this.parent_id = info.parent_id;
    this.name = info.name;
    this.content = info.content;
    this.created_at = info.created_at;
    this.updated_at = info.updated_at;
  }

  fields() {
    return {
      id: this.id,
      parent_id: this.parent_id,
      name: this.name,
      content: this.content,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }

  update() {
    return new Promise((resolve, reject) => {
      let query = "UPDATE memos SET ? WHERE id = ? LIMIT 1";

      db.query(query, [this.fields(), this.id], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      let query = "DELETE FROM memos WHERE id = ? LIMIT 1";

      db.query(query, [this.id], (err, res) => {
        if(err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
}

module.exports = Memo;
