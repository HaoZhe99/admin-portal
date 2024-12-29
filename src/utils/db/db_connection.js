import { Pool } from 'pg'

export const pool = new Pool({
  connectionString:
    'postgresql://neondb_owner:x2o7XJSsWdyQ@ep-purple-king-a4eraspk-pooler.us-east-1.aws.neon.tech/admin-portal?sslmode=require'

  // host: process.env.DATABASE_HOST,
  // user: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000
})

// Export the pool for use in other modules
