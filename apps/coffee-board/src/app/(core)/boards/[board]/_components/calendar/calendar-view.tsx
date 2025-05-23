import React from "react"
import CalendarHeader from "./calendar-header"
import CalendarWeek from "./calendar-week"
import { cn } from "@/lib/utils"
import CalendarContent from "./calendar-content"

export default function CalendarView() {
	return (
		<div className="flex-1 overflow-y-auto flex overflow-x-auto flex-col">
			<CalendarHeader />
			<CalendarWeek />
			<CalendarContent />
		</div>
	)
}
