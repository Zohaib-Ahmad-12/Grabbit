// import { Pool } from "pg";
// import net from 'net'


// net.setDefaultAutoSelectFamilyAttemptTimeout(5000)

// const pool =new Pool({
//     connectionString:process.env.DATABASE_URL,
//      connectionTimeoutMillis: 10000,
// })

// export default pool;

// lib/db.ts
import net from 'net'
import { Pool } from 'pg'

net.setDefaultAutoSelectFamilyAttemptTimeout(5000)

const globalForPg = globalThis as unknown as { pool?: Pool }

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 10000,
  })

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool

export default pool