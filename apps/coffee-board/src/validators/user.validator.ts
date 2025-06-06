import { z } from "zod"

export const userValidator = z.object({
	username: z
		.string()
		.min(3, "Username should be at least 3 characters")
		.max(20, "Username should be at most 20 characters"),
	email: z.string().email(),
	first_name: z.nullable(z.string().min(1).max(50)).default(null),
	last_name: z.nullable(z.string().min(1).max(50)).default(null),
	password: z
		.string()
		.min(1, "Password should be at least 1 character")
		.max(255, "Password should be at most 255 characters"),
})

export const userUpdateValidator = userValidator.extend({
	id: z.number().int().positive(),
	password: z.nullable(z.string().min(1).max(255)),
})

export const userDeleteValidator = userUpdateValidator.pick({
	id: true,
})
