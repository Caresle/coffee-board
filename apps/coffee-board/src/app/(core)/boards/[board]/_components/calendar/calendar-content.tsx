import { useState } from "react"
import CalendarDayCell from "./calendar-day-cell"
import CalendarTimeCell from "./calendar-time-cell"
import { CalendarEvent } from "@/entities/calendar.entity"

export default function CalendarContent() {
	const [hoverEvent, setHoverEvent] = useState<CalendarEvent | null>(null)

	return (
		<>
			<div className="grid grid-cols-12 flex-1 overflow-y-auto">
				<div className="col-span-1 flex flex-col">
					{Array(24)
						.fill(0)
						.map((_, i) => (
							<CalendarTimeCell isEven={i % 2 === 0} key={i}>
								{i.toString().padStart(2, "0")}:00
							</CalendarTimeCell>
						))}
				</div>
				<div className="col-span-11 grid grid-cols-7">
					{Array(168)
						.fill(0)
						.map((_, i) => (
							<CalendarDayCell
								key={i}
								value={i}
								column={i % 7}
								hoveredEvent={hoverEvent}
								setHoveredEvent={setHoverEvent}
							>
								{/* {i} */}
							</CalendarDayCell>
						))}
				</div>
			</div>
		</>
	)
}
