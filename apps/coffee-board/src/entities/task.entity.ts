import { INVALID_ID } from "@/constants/invalid-id"
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
	checklist: Array<TaskCheckList> | null
	history: Array<TaskHistory> | null
	attachments: []
}

export const EmptyTask: Task = {
	id: INVALID_ID.taskInputId,
	id_board_det: INVALID_ID.boardColumnItem,
	name: "",
	description: null,
	date_begin: null,
	date_end: null,
	priority: {} as Priority,
	tags: [],
	checklist: null,
	history: null,
	attachments: [],
	time_estimation: null,
	created_at: new Date(),
	id_priority: null,
	id_assigned: null,
}

export type TaskQuick = Pick<Task, "name" | "id_board_det">

export interface TaskHistory {
	user: object
	message: TaskMessage
}

export interface TaskMessage {
	id: number
	id_task: number
	msg: string
	stamp: Date
	id_user: number
}

export interface TaskCheckList {
	header: TaskCheckListHeader
	details: TaskCheckListDetails[]
}

export interface TaskCheckListHeader {
	id: number
	id_task: number
	name: string
}

export interface TaskCheckListDetails {
	id: number
	id_checklist: number
	name: string
	completed: boolean
	level: number
	id_parent: number | null
}
