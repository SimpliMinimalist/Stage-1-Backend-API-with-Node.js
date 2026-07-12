const { pool } = require("../database/connection");
class UserModel {
  static async create({ username, email, password, address }) {
    const sql = `
      INSERT INTO users (username, email, password, address)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      username,
      email,
      password,
      address,
    ]);
    return this.findById(result.insertId);
  }
  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.execute(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
  }
  static async findByUsername(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const [rows] = await pool.execute(sql, [username]);
    return rows.length > 0 ? rows[0] : null;
  }
  static async findById(id) {
    const sql = `
      SELECT id, username, email, address, created_at, updated_at
      FROM users
      WHERE id = ?
    `;
    const [rows] = await pool.execute(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
  }
}
module.exports = UserModel;
