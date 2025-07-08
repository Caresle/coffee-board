import getAllBoards from "@/actions/boards/get-all-boards"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { boardValidator } from "@/validators/board.validator"
import { NextRequest } from "next/server"
import { QueriesBoard } from "./queries"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

const getBoards = async () => {
	try {
		const data = await getAllBoards()
		return apiResponse({ data })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const createBoard = async (req: NextRequest) => {
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

export const GET = async () =>
	hasAccess({
		method: getBoards,
		permission: PERMISSIONS.ReadBoards.name,
	})

export const POST = async (req: NextRequest) =>
	hasAccess({
		permission: PERMISSIONS.CreateBoards.name,
		method: createBoard,
		req,
	})
