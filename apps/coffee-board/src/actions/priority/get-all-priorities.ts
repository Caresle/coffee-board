"use server"

import { Priority } from "@/entities/priority.entity"
import { pgQuery } from "@/lib/pg"

const query = `
    select * from priorities
    order by value desc
`

export async function getAllPriorities(): Promise<Priority[]> {
	try {
		const data = await pgQuery(query)
		return data as Priority[]
	} catch (error) {
		console.error(error)
		return []
	}
}
