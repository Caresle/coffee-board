"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    select * from v_cf_tasks
    where id_board_det = $1
`

export async function getAllTasks(id_board_det: number) {
	try {
		const data = await pgQuery(query, [id_board_det])
		return data
	} catch (error) {
		console.error(error)
		return []
	}
}
