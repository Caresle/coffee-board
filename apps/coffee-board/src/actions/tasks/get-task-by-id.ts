"use server"

import { pgQuery } from "@/lib/pg"

const query = `SELECT * FROM v_cf_tasks WHERE id = $1`

export async function getTaskById(id: number) {
	try {
		const data = (await pgQuery(query, [id]))?.[0] ?? null

		return data
	} catch (error) {
		console.error(error)
		return null
	}
}
