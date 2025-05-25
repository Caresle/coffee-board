import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { userValidator } from "@/validators/user.validator"
import { NextRequest } from "next/server"
import { QueriesUsers } from "./queries"
import { encrypt } from "@/lib/encrypt"

export async function POST(req: NextRequest) {
	try {
		const validated = userValidator.parse(await req.json())

		const password = encrypt(validated.password)

		const data = (
			await pgQuery(QueriesUsers.createUser, [
				validated.username,
				validated.email,
				validated.password,
				validated.first_name,
				validated.last_name,
			])
		)?.[0]

		return apiResponse({
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
