import { get, isEmpty, toInteger } from "lodash";

import { pool } from "../../../utils/db/db_connection";
import { auth } from "../../../../auth";

export async function GET() {
  const { user } = await auth();
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE user_id = $1",
      [get(user, ["id"], "")],
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error get product:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { name, price, status, image, userId } = await req.json();

    if (!name || !status || !price || !image || !userId) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 },
      );
    }

    const result = await pool.query(
      "INSERT INTO products (name,  price, status, image, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, status, image, userId],
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    const { id, name, price, status, image } = await req.json();

    if (
      isEmpty(name) ||
      isEmpty(status) ||
      isEmpty(price) ||
      isEmpty(image) ||
      isEmpty(id)
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 },
      );
    }

    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, status = $3, image = $4 WHERE id = $5 RETURNING *",
      [name, price, status, image, id],
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export const DELETE = async (req) => {
  const url = new URL(req.url).searchParams;
  const id = parseInt(url.get("id"), 10);

  if (isNaN(id) || id <= 0) {
    return new Response(JSON.stringify({ message: "Invalid product ID" }), {
      status: 400,
    });
  }

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
