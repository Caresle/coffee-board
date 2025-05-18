import { z } from "zod"

export const tagValidator = z.object({
	name: z.string().min(1).max(255),
	color: z.string().min(1).max(255),
})

export const tagUpdateValidator = tagValidator.extend({
	id: z.number({ coerce: true }),
})

export const tagDeleteValidator = tagUpdateValidator.pick({
	id: true,
})
