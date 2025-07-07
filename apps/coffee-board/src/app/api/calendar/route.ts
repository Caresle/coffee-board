import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { calendarValidator } from "@/validators/calendar.validator"
import { NextRequest } from "next/server"
import { QueriesCalendar } from "./queries"
import { getTokenData } from "@/actions/get-token-data"

export async function POST(req: NextRequest) {
	try {
		const json = await req.json()
		const token = await getTokenData()
		const validated = calendarValidator.parse({ ...json, id_user: token?.id })

		const data = (
			await pgQuery(QueriesCalendar.createEvent, [
				validated.id_project,
				validated.id_user,
				validated.name,
				validated.event_type,
				validated.time_start,
				validated.time_end,
				validated.date_begin,
				validated.date_end,
			])
		)?.[0]

		return apiResponse({ data })
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
