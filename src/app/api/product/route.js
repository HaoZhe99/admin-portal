import { get, isEmpty, toInteger } from "lodash";

import { pool } from "../../../utils/db/db_connection";
import { auth } from "../../../../auth";
import moment from "moment-timezone";

export async function GET(request) {
  const { user } = await auth();

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const perPage = parseInt(url.searchParams.get("limit") || "10", 2);

  const offset = (page - 1) * perPage;

  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE user_id = $1 LIMIT $2 OFFSET $3",
      [get(user, ["id"], ""), perPage, offset],
    );

    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM products WHERE user_id = $1",
      [get(user, ["id"], "")],
    );
    const total = parseInt(totalResult.rows[0].count, 10);

    return new Response(
      JSON.stringify({
        data: result.rows,
        pagination: {
          total,
          page,
          perPage,
          totalPages: Math.ceil(total / perPage),
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error get product:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const {
      name,
      price,
      status,
      image,
      userId,
      quantity,
      category,
      description,
    } = await req.json();

    if (
      isEmpty(name) ||
      isEmpty(status) ||
      isEmpty(price) ||
      isEmpty(image) ||
      isEmpty(quantity) ||
      isEmpty(category) ||
      isEmpty(description)
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 },
      );
    }

    const result = await pool.query(
      "INSERT INTO products (name,  price, status, image, user_id, quantity, category, description, created_at) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9) RETURNING *",
      [
        name,
        price,
        status,
        image,
        userId,
        quantity,
        category,
        description,
        moment().tz("Asia/Singapore").format("YYYY-MM-DD HH:mm:ss"),
      ],
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
    const { id, name, price, status, image, quantity, category, description } =
      await req.json();

    if (
      isEmpty(name) ||
      isEmpty(status) ||
      isEmpty(price) ||
      isEmpty(image) ||
      isEmpty(id) ||
      isEmpty(quantity) ||
      isEmpty(category) ||
      isEmpty(description)
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 },
      );
    }

    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2, status = $3, image = $4, quantity = $6, category = $7, description = $8, updated_at = $9 WHERE id = $5 RETURNING *",
      [
        name,
        price,
        status,
        image,
        id,
        quantity,
        category,
        description,
        moment().tz("Asia/Singapore").format("YYYY-MM-DD HH:mm:ss"),
      ],
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
