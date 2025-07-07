import { z } from "zod"

export const calendarValidator = z.object({
	id_project: z.number({ coerce: true }),
	id_user: z.nullable(z.number({ coerce: true })),
	name: z.string().min(1).max(255),
	event_type: z.enum(["MEETING", "WORK", "REMINDER", "OTHER"]),
	time_start: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
	time_end: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
	date_begin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	date_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	deleted: z.number({ coerce: true }).default(0),
})

export const calendarUpdateValidator = calendarValidator.extend({
	id: z.number({ coerce: true }),
})

export const calendarDeleteValidator = calendarUpdateValidator.pick({
	id: true,
})
