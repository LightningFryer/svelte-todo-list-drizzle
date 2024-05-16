// import 'dotenv/config'
import {DATABASE_URL} from "$env/static/private"
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(DATABASE_URL, { prepare: false })
export const db = drizzle(client);