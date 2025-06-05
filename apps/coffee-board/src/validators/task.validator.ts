import { z } from "zod"

export const taskValidator = z.object({
	id_board_det: z.number({ coerce: true }),
	name: z.string().min(1).max(255),
	description: z.nullable(z.string().min(1).max(255)).default(null),
	date_begin: z.nullable(z.date({ coerce: true })).default(null),
	date_end: z.nullable(z.date({ coerce: true })).default(null),
	id_priority: z.nullable(z.number({ coerce: true })).default(null),
	id_assigned: z.nullable(z.number({ coerce: true })).default(null),
	time_estimation: z.nullable(z.number({ coerce: true })).default(null),
})

export const taskUpdateValidator = taskValidator.extend({
	id: z.number({ coerce: true }),
})

export const taskHistoryValidator = z.object({
	id_task: z.number({ coerce: true }),
	msg: z.string().min(1).max(255),
	id_user: z.number({ coerce: true }),
})

export const taskHistoryUpdateValidator = taskHistoryValidator.extend({
	id: z.number({ coerce: true }),
})

export const taskCheckListValidator = z.object({
	id_task: z.number({ coerce: true }),
	name: z.string().min(1).max(255),
})

export const taskChecklistUpdateValidator = taskCheckListValidator
	.extend({
		id: z.number({ coerce: true }),
	})
	.omit({
		id_task: true,
	})
