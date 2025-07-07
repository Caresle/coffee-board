import { getTokenData } from "@/actions/get-token-data"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { calendarUpdateValidator } from "@/validators/calendar.validator"
import { NextRequest } from "next/server"
import { QueriesCalendar } from "../queries"
import { pgQuery } from "@/lib/pg"

interface CalendarParams {
	params: Promise<{ calendar: string }>
}

export async function PUT(req: NextRequest, { params }: CalendarParams) {
	try {
		const { calendar } = await params
		const token = await getTokenData()
		const json = await req.json()
		const validated = calendarUpdateValidator.parse({
			...json,
			id: calendar,
			id_user: token?.id,
		})

		const data = (
			await pgQuery(QueriesCalendar.updateEvent, [
				validated.id,
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

export async function DELETE(_: NextRequest, { params }: CalendarParams) {
	try {
		const { calendar } = await params

		const data = (
			await pgQuery(QueriesCalendar.deleteEventSoft, [calendar])
		)?.[0]

		return apiResponse({
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
