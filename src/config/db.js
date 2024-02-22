import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  uri: process.env.MYSQL_URI,
  multipleStatements: true,
});

export default pool;

