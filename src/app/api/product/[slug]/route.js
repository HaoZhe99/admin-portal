import { pool } from "../../../../utils/db/db_connection";

export async function GET(req, { params }) {
  const { slug } = await params;

  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      slug,
    ]);

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error get product:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
