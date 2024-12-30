import { pool } from "./db/db_connection";
import CryptoJS from "crypto-js";

export async function getUserFromDb(email, pwHash) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = result.rows[0];

    const hashedInputPassword = CryptoJS.SHA256(pwHash).toString();

    if (hashedInputPassword !== user.password) {
      throw new Error("Invalid credentials");
    }

    return { id: user.id, name: user.name, email: user.email };
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("Database query failed");
  }
}
