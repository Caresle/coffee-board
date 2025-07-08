import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { boardDetailValidator } from "@/validators/board.validator"
import { NextRequest } from "next/server"
import { QueriesBoardDetails } from "./queries"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface BoardDetailsProps {
	params: Promise<{ board: string }>
}

const createDetail = async (
	req: NextRequest,
	{ params }: BoardDetailsProps,
) => {
	try {
		const { board } = await params
		const json = await req.json()

		const validated = boardDetailValidator.parse({ id_board: +board, ...json })

		const data =
			(
				await pgQuery(QueriesBoardDetails.insertOne, [
					validated.id_board,
					validated.name,
					validated.board_order,
					validated.deleted,
				])
			)?.[0] ?? null

		return apiResponse({
			data,
			message: "Board details inserted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function GET() {}

export const POST = async (req: NextRequest, params: BoardDetailsProps) =>
	hasAccess<BoardDetailsProps>({
		method: createDetail,
		permission: PERMISSIONS.CreateBoardDets.name,
		params,
		req,
	})
