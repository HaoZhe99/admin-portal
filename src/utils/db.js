import { pool } from "./db/db_connection";

export async function getUserFromDb(email, pwHash) {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      [email, pwHash],
    );

    // If a user is found, return the first row; otherwise, return null
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("Database query failed");
  }
}
