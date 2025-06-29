import React from "react"
import CalendarHeader from "./calendar-header"
import CalendarWeek from "./calendar-week"
import CalendarContent from "./calendar-content"
import { CalendarProvider } from "../../_hook/use-calendar"

export default function CalendarView() {
	return (
		<CalendarProvider>
			<div className="flex-1 overflow-y-auto flex overflow-x-auto flex-col">
				<CalendarHeader />
				<CalendarWeek />
				<CalendarContent />
			</div>
		</CalendarProvider>
	)
}
