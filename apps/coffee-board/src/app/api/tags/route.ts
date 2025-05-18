import { getAllTags } from "@/actions/tags/get-all-tags"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { tagValidator } from "@/validators/tag.validator"
import { NextRequest } from "next/server"
import { QueriesTag } from "./queries"

export async function GET() {
	try {
		const tags = await getAllTags()
		return apiResponse({ data: tags, message: "Tags retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function POST(req: NextRequest) {
	try {
		const data = tagValidator.parse(await req.json())
		const value = (
			await pgQuery(QueriesTag.createTag, [data.name, data.color])
		)?.[0]

		return apiResponse({ data: value, message: "Tag created successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
