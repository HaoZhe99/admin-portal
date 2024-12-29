import { isEmpty } from 'lodash'

import { pool } from '../../../db/db_connection'

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 })
    }

    const result = await pool.query('INSERT INTO users (name,  email,password) VALUES ($1, $2, $3) RETURNING *', [
      username,
      email,
      password
    ])

    return new Response(JSON.stringify(result.rows[0]), { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)

    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
  }
}
