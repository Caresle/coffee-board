import { getTagById } from "@/actions/tags/get-tag-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesTag } from "../queries"
import { tagUpdateValidator } from "@/validators/tag.validator"

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ tag: string }> },
) {
	try {
		const tag = (await params).tag
		const data = await getTagById(+tag)

		return apiResponse({ data, message: "Tag retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ tag: string }> },
) {
	try {
		const tag = (await params).tag
		const json = await req.json()

		const validated = tagUpdateValidator.parse({ id: tag, ...json })

		const data = (
			await pgQuery(QueriesTag.updateTag, [
				validated.name,
				validated.color,
				validated.id,
			])
		)?.[0]

		return apiResponse({ data, message: "Tag updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ tag: string }> },
) {
	try {
		const tag = (await params).tag
		const value = (await pgQuery(QueriesTag.deleteTag, [tag]))?.[0]

		return apiResponse({ data: value, message: "Tag deleted successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
