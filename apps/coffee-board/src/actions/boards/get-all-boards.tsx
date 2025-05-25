"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    select * from v_cf_boards
`

export default async function getAllBoards() {
	try {
		const data = await pgQuery(query)
		return data
	} catch (error) {
		console.error(error)
		return []
	}
}
