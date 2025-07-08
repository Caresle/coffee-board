import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { boardDetailUpdateValidator } from "@/validators/board.validator"
import { NextRequest } from "next/server"
import { QueriesBoardDetails } from "../queries"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface BoardDetailsProps {
	params: Promise<{ board: string; detail: string }>
}

const updateDetail = async (
	req: NextRequest,
	{ params }: BoardDetailsProps,
) => {
	try {
		const { board, detail } = await params
		const json = await req.json()

		const validated = boardDetailUpdateValidator.parse({
			id_board: +board,
			id: +detail,
			...json,
		})

		const data = (
			await pgQuery(QueriesBoardDetails.updateOne, [
				validated.name,
				validated.board_order,
				validated.deleted,
				validated.id,
			])
		)?.[0]

		return apiResponse({
			data,
			message: "Board details updated successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const deleteDetail = async (_: NextRequest, { params }: BoardDetailsProps) => {
	try {
		const { detail } = await params

		const data = (await pgQuery(QueriesBoardDetails.deleteOne, [+detail]))?.[0]

		return apiResponse({
			data,
			message: "Board details deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function GET() {}

export const PUT = async (req: NextRequest, params: BoardDetailsProps) =>
	hasAccess<BoardDetailsProps>({
		method: updateDetail,
		permission: PERMISSIONS.UpdateBoardDets.name,
		params,
		req,
	})

export const DELETE = async (req: NextRequest, params: BoardDetailsProps) =>
	hasAccess<BoardDetailsProps>({
		method: deleteDetail,
		permission: PERMISSIONS.DeleteBoardDets.name,
		params,
		req,
	})
