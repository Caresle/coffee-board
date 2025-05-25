import { getUserById } from "@/actions/user/get-user-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { userUpdateValidator } from "@/validators/user.validator"
import { NextRequest } from "next/server"
import { QueriesUsers } from "../queries"
import { encrypt } from "@/lib/encrypt"

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ user: string }> },
) {
	try {
		const { user: id } = await params

		const user = await getUserById(+id)

		return apiResponse({ data: user, message: "User fetched successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ user: string }> },
) {
	try {
		const { user: id } = await params
		const json = await req.json()

		const validated = userUpdateValidator.parse({ id, ...json })

		const password = validated.password ? encrypt(validated.password) : null

		const data = (
			await pgQuery(QueriesUsers.updateUser, [
				validated.username,
				validated.email,
				password,
				validated.first_name,
				validated.last_name,
				validated.id,
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

export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ user: string }> },
) {
	try {
		const { user: id } = await params

		const data = (await pgQuery(QueriesUsers.deleteUser, [id]))?.[0]

		return apiResponse({
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
