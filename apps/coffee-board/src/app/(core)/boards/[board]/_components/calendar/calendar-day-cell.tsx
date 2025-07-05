import { cn } from "@/lib/utils"
import React, { useMemo } from "react"
import { useCalendarStore } from "../../_states/calendar.state"
import { useCalendar } from "../../_hook/use-calendar"
import { CalendarEvent } from "@/entities/calendar.entity"
import { useEventPopoverStore } from "@/states/event-popover.state"

interface CalendarDayCellProps {
	value: number
	children?: React.ReactNode
	column: number
	hoveredEvent?: CalendarEvent | null
	setHoveredEvent?: (event: CalendarEvent | null) => void
}

export default function CalendarDayCell({
	value,
	children,
	column,
	hoveredEvent,
	setHoveredEvent,
}: CalendarDayCellProps) {
	const { update, selectedIndex } = useCalendarStore(state => state)
	const { events, setEvents } = useCalendar()
	const { update: updateEventPopover } = useEventPopoverStore.getState()

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

	const eventForCell = useMemo(() => {
		return events.find(
			event =>
				value >= event.timeStart &&
				value <= event.timeEnd &&
				column === event.column,
		)
	}, [value, column, events])

	const onClick = () => {
		if (eventForCell) {
			console.log("Event already exists for this cell:", eventForCell)
			updateEventPopover({
				item: eventForCell,
				show: true,
			})
			return
		}

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
			timeStart: selectedIndex.start < value ? selectedIndex.start : value,
			timeEnd: value > selectedIndex.start ? value : selectedIndex.start,
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

	const isHovered =
		hoveredEvent && eventForCell && eventForCell.id === hoveredEvent.id

	const handleMouseEnter = () => {
		if (setHoveredEvent && eventForCell) {
			setHoveredEvent(eventForCell)
		}
	}

	const handleMouseLeave = () => {
		if (setHoveredEvent) {
			setHoveredEvent(null)
		}
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
					"bg-orange-200 dark:bg-orange-700 border-orange-200 dark:border-orange-700":
						isHovered,
				},
			)}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	)
}
