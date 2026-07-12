const mysql = require("mysql2/promise");
const config = require("../config");

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};

const closePool = async () => {
  try {
    await pool.end();
    console.log("MySQL pool closed");
  } catch (error) {
    console.error("Error closing MySQL pool:", error.message);
  }
};

module.exports = {
  pool,
  testConnection,
  closePool,
};
