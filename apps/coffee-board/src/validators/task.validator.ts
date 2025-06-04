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
