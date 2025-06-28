import { cn } from "@/lib/utils"
import React from "react"
import { useCalendarStore } from "../../_states/calendar.state"
import CalendarDayCell from "./calendar-day-cell"
import CalendarTimeCell from "./calendar-time-cell"

export default function CalendarContent() {
	const { selectedIndex } = useCalendarStore(state => state)
	return (
		<>
			start: {selectedIndex.start}
			end: {selectedIndex.end}
			<div className="grid grid-cols-12 flex-1 overflow-y-auto">
				<div className="col-span-2 flex flex-col">
					{Array(24)
						.fill(0)
						.map((_, i) => (
							<CalendarTimeCell isEven={i % 2 === 0} key={i}>
								{i}
							</CalendarTimeCell>
						))}
				</div>
				<div className="col-span-10 grid grid-cols-7">
					{Array(168)
						.fill(0)
						.map((_, i) => (
							<CalendarDayCell key={i} value={i} column={i % 7}>
								{i}
							</CalendarDayCell>
						))}
				</div>
			</div>
		</>
	)
}
