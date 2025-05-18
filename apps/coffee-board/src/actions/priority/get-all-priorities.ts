"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    select * from priorities
    order by value desc
`

export async function getAllPriorities() {
	try {
		const data = await pgQuery(query)
		return data
	} catch (error) {
		console.error(error)
		return []
	}
}
