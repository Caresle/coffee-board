import getBoardById from "@/actions/boards/get-board-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { NextRequest } from "next/server"
import { QueriesBoard } from "../queries"
import { pgQuery } from "@/lib/pg"
import { boardUpdateValidator } from "@/validators/board.validator"
import { PERMISSIONS } from "@/constants/access"
import { hasAccess } from "@/middlewares/has-access"

interface BoardParams {
	params: Promise<{ board: string }>
}

const getBoard = async (_: NextRequest, { params }: BoardParams) => {
	try {
		const boardId = (await params).board

		const board = await getBoardById(+boardId)

		return apiResponse({ data: board, message: "Board retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const updateBoard = async (req: NextRequest, { params }: BoardParams) => {
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

const deleteBoard = async (_: NextRequest, { params }: BoardParams) => {
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

export const GET = async (req: NextRequest, params: BoardParams) =>
	hasAccess<BoardParams>({
		method: getBoard,
		permission: PERMISSIONS.ReadBoards.name,
		params,
		req,
	})

export const PUT = async (req: NextRequest, params: BoardParams) =>
	hasAccess<BoardParams>({
		method: updateBoard,
		permission: PERMISSIONS.UpdateBoards.name,
		params,
		req,
	})

export const DELETE = async (req: NextRequest, params: BoardParams) =>
	hasAccess<BoardParams>({
		method: deleteBoard,
		permission: PERMISSIONS.DeleteBoards.name,
		params,
		req,
	})
