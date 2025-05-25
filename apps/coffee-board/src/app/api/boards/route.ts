import getAllBoards from "@/actions/boards/get-all-boards"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { boardValidator } from "@/validators/board.validator"
import { NextRequest } from "next/server"
import { QueriesBoard } from "./queries"

export async function GET() {
	try {
		const data = await getAllBoards()
		return apiResponse({ data })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function POST(req: NextRequest) {
	try {
		const validated = boardValidator.parse(await req.json())

		const data = await pgQuery(QueriesBoard.createBoard, [
			validated.id_project,
			validated.name,
			validated.description,
			validated.visibility,
		])

		return apiResponse({ data, message: "Board created successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
