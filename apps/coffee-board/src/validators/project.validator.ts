import { z } from "zod"

export const projectValidator = z.object({
	name: z.string().min(1).max(255),
	description: z.string().min(1).max(255).optional(),
	visibility: z.enum(["public", "private"]).optional(),
})

export const projectUpdateValidator = projectValidator.extend({
	id: z.number({ coerce: true }),
})

export const projectDeleteValidator = projectUpdateValidator.pick({
	id: true,
})
