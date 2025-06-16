"use server"

import { TaskCheckList } from "@/entities/task.entity"
import { pgQuery } from "@/lib/pg"

const query = `
    SELECT * FROM v_cf_tasks_checklist WHERE id_task = $1;
`

export default async function getChecklistByTask(
	id: number,
): Promise<TaskCheckList> {
	try {
		const data = (await pgQuery(query, [id]))?.[0]?.checklist
		return data?.[0] as TaskCheckList
	} catch (error) {
		console.error(error)
		return {} as TaskCheckList
	}
}
