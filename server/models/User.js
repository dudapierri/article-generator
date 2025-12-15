const { getDatabase } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, email, password) {
    const db = getDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    const result = stmt.run(username, email, hashedPassword);
    return result.lastInsertRowid;
  }

  static async findByEmail(email) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  static async findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?');
    return stmt.get(id);
  }

  static async findByUsername(username) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username);
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;

