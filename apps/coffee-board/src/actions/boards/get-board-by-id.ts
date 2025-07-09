"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    select * from v_cf_boards where id = $1
`

export default async function getBoardById(id: number) {
	try {
		const data = (await pgQuery(query, [id]))?.[0] ?? null
		return data
	} catch (error) {
		console.error(error)
		return null
	}
}
