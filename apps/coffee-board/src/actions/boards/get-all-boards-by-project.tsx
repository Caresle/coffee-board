"use server"

import { Board } from "@/entities/board.entity"
import { pgQuery } from "@/lib/pg"

const query = `
    SELECT
        *
    FROM v_cf_boards
    WHERE id_project = $1
	and deleted = 0
`

export default async function getAllBoardsByProject(
	projectId: number,
): Promise<Board[]> {
	try {
		const boards = await pgQuery(query, [projectId])
		return boards as Board[]
	} catch (error) {
		console.error(error)
		return []
	}
}
