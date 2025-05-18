import pg from "pg"
const { Pool } = pg

const pool = new Pool({
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: Number(process.env.DB_PORT),
})

pool.on("error", (err, client) => {
	console.error("Unexpected error on idle client", err)
	client.release()
	pool.end()
	process.exit(-1)
})

export const pgQuery = async (query: string, params: any[] = []) => {
	const client = await pool.connect()
	try {
		const res = await client.query(query, params)
		return res.rows
	} catch (error) {
		console.error(error)
	} finally {
		client.release()
	}
}
