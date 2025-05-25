import { z } from "zod"

export const boardValidator = z.object({
	id_project: z.number({ coerce: true }),
	name: z.string().min(1).max(255),
	description: z.nullable(z.string().min(1).max(255)),
	visibility: z.enum(["public", "private"]).optional(),
})

export const boardUpdateValidator = boardValidator.extend({
	id: z.number({ coerce: true }),
})

export const boardDeleteValidator = boardUpdateValidator.pick({
	id: true,
})
