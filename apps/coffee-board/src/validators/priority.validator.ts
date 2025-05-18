import { z } from "zod"

export const priorityValidator = z.object({
	name: z.string().min(1).max(255),
	value: z.number({ coerce: true }).min(0),
})

export const priorityUpdateValidator = priorityValidator.extend({
	id: z.number({ coerce: true }),
})

export const priorityDeleteValidator = priorityUpdateValidator.pick({
	id: true,
})
