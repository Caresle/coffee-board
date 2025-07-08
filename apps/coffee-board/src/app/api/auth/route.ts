import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { compare } from "@/lib/encrypt"
import { signToken } from "@/lib/jwt"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { z } from "zod"

const query = `
    select * from users
    where username = $1
`

const validator = z.object({
	username: z.string(),
	password: z.string(),
})

export async function POST(req: NextRequest) {
	try {
		const validated = validator.parse(await req.json())

		const data = (await pgQuery(query, [validated.username]))?.[0]

		if (!data) {
			return apiResponseError({
				error: "Invalid username or password",
				status: 400,
			})
		}

		if (!compare(validated.password, data.password)) {
			return apiResponseError({
				error: "Invalid username or password",
				status: 400,
			})
		}

		const token = await signToken({
			id: data.id,
			username: data.username,
			app_role: data.app_role,
		})

		return apiResponse({
			data: token,
			message: "Login successful",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
