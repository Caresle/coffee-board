import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"

interface BoardDetailsProps {
	params: Promise<{ board: string; detail: string }>
}

const query = {
	archive: `
        UPDATE board_details
        SET deleted = 1
        WHERE id = $1
        RETURNING *
    `,
}

export async function PUT(_: NextRequest, { params }: BoardDetailsProps) {
	try {
		const { detail } = await params

		const data = await pgQuery(query.archive, [detail])

		return apiResponse({
			data,
			message: "Board detail archived successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
