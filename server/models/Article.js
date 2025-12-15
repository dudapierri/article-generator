const { getDatabase } = require('../config/database');

class Article {
  static create(userId, title, content, topic = null, wordCount = null) {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO articles (user_id, title, content, topic, word_count)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(userId, title, content, topic, wordCount);
    return result.lastInsertRowid;
  }

  static findByUserId(userId) {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT * FROM articles 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `);
    return stmt.all(userId);
  }

  static findById(id) {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM articles WHERE id = ?');
    return stmt.get(id);
  }

  static update(id, title, content, status = 'draft') {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE articles 
      SET title = ?, content = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(title, content, status, id);
  }

  static delete(id, userId) {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM articles WHERE id = ? AND user_id = ?');
    return stmt.run(id, userId);
  }
}

module.exports = Article;

