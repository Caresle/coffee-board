import { z } from "zod"

export const userValidator = z.object({
	username: z.string().min(3).max(20),
	email: z.string().email(),
	first_name: z.nullable(z.string().min(1).max(50)),
	last_name: z.nullable(z.string().min(1).max(50)),
	password: z.string().min(1).max(255),
})

export const userUpdateValidator = userValidator.extend({
	id: z.number().int().positive(),
	password: z.nullable(z.string().min(1).max(255)),
})

export const userDeleteValidator = userUpdateValidator.pick({
	id: true,
})
