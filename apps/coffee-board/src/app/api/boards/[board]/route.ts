import getBoardById from "@/actions/boards/get-board-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { NextRequest } from "next/server"
import { QueriesBoard } from "../queries"
import { pgQuery } from "@/lib/pg"
import { boardUpdateValidator } from "@/validators/board.validator"

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ board: string }> },
) {
	try {
		const boardId = (await params).board

		const board = await getBoardById(+boardId)

		return apiResponse({ data: board, message: "Board retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ board: string }> },
) {
	try {
		const id = (await params).board
		const json = await req.json()

		const validated = boardUpdateValidator.parse({ id, ...json })

		const data = await pgQuery(QueriesBoard.updateBoard, [
			validated.name,
			validated.description,
			validated.visibility,
			validated.id,
		])

		return apiResponse({ data, message: "Board updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ board: string }> },
) {
	try {
		const id = (await params).board
		const data = await pgQuery(QueriesBoard.deleteBoardSoft, [id])

		return apiResponse({
			data,
			message: "Board deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
