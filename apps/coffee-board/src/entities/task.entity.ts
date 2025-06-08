import { Priority } from "./priority.entity"
import { Tag } from "./tag.entity"

export interface Task {
	id: number
	id_board_det: number
	name: string
	description: string | null
	date_begin: Date | null
	date_end: Date | null
	id_priority: number | null
	id_assigned: number | null
	time_estimation: number | null
	created_at: Date
	priority: Priority
	tags: Tag[]
	checklist: []
	history: []
	attachments: []
}

export type TaskQuick = Pick<Task, "name" | "id_board_det">
