import { cn } from "@/lib/utils"
import React, { useMemo } from "react"
import { useCalendarStore } from "../../_states/calendar.state"
import { useCalendar } from "../../_hook/use-calendar"
import { CalendarEvent } from "@/entities/calendar.entity"

interface CalendarDayCellProps {
	value: number
	children?: React.ReactNode
	column: number
}

export default function CalendarDayCell({
	value,
	children,
	column,
}: CalendarDayCellProps) {
	const { update, selectedIndex } = useCalendarStore(state => state)
	const { events, setEvents } = useCalendar()

	const { isSelected, isEnd, isStart } = useMemo(() => {
		const result = events.reduce(
			(acc, event) => {
				if (event.timeStart === value && event.column === column) {
					acc.isSelected = true
					acc.isStart = true
					acc.isEnd = false
				}

				if (event.timeEnd === value && event.column === column) {
					acc.isSelected = true
					acc.isStart = false
					acc.isEnd = true
				}

				if (
					value > event.timeStart &&
					value < event.timeEnd &&
					column === event.column
				) {
					acc.isSelected = true
				}

				return acc
			},
			{
				isSelected: false,
				isStart: false,
				isEnd: false,
			},
		)

		return result
	}, [value, column, events])

	const onClick = () => {
		if (selectedIndex.start === -1) {
			update({
				selectedIndex: {
					start: value,
					end: -1,
					columnStart: column,
					columnEnd: -1,
				},
			})
			return
		}

		const newEvent: CalendarEvent = {
			id: events.length + 1,
			timeStart: selectedIndex.start,
			timeEnd: value,
			column,
		}

		setEvents([...events, newEvent])
		update({
			selectedIndex: {
				start: -1,
				end: -1,
				columnStart: -1,
				columnEnd: -1,
			},
		})
	}

	return (
		<div
			className={cn(
				"border transition-all hover:bg-orange-200 cursor-pointer dark:hover:bg-orange-700",
				{
					"bg-blue-200 border-blue-200 dark:bg-blue-400 dark:border-blue-400":
						isSelected,
					"rounded-b-lg": isEnd,
					"rounded-t-lg": isStart,
				},
			)}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
