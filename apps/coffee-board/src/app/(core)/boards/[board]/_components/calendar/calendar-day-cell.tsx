import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { useCalendarStore } from "../../_states/calendar.state"
import { useCalendar } from "../../_hook/use-calendar"
import { CalendarEvent, CalendarEventType } from "@/entities/calendar.entity"
import { useEventPopoverStore } from "@/states/event-popover.state"

interface CalendarDayCellProps {
	value: number
	children?: React.ReactNode
	column: number
}

const calculateEventStatus = ({
	value,
	events,
	column,
}: {
	value: number
	column: number
	events: CalendarEvent[]
}) => {
	return events.reduce(
		(acc, event) => {
			if (event.column !== column) return acc

			const isStart = event.timeStart === value
			const isEnd = event.timeEnd === value
			const isBetween = value > event.timeStart && value < event.timeEnd

			if (isStart && isEnd) {
				return { isSelected: true, isStart: true, isEnd: true }
			}

			if (isStart || isEnd || isBetween) {
				acc.isSelected = true
			}

			if (isStart) {
				acc.isStart = true
			}

			if (isEnd) {
				acc.isEnd = true
			}

			return acc
		},
		{
			isSelected: false,
			isStart: false,
			isEnd: false,
		},
	)
}

export default function CalendarDayCell({
	value,
	children,
	column,
}: CalendarDayCellProps) {
	const { update, selectedIndex } = useCalendarStore(state => state)
	const {
		events,
		createEvent,
		handleMouseEnter,
		handleMouseLeave,
		hoverEvent,
	} = useCalendar()
	const { update: updateEventPopover } = useEventPopoverStore.getState()

	const { isSelected, isEnd, isStart } = useMemo(() => {
		const result = calculateEventStatus({
			value,
			events,
			column,
		})

		return result
	}, [value, column, events])

	const eventForCell = useMemo(() => {
		const found = events.find(
			event =>
				value >= event.timeStart &&
				value <= event.timeEnd &&
				column === event.column,
		)

		if (!found) return null
		return found
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

		createEvent({
			value,
			column,
			selectedCell: selectedIndex,
		})

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
		hoverEvent && eventForCell && eventForCell.id === hoverEvent.id

	return (
		<div
			className={cn("border transition-all cursor-pointer", {
				"hover:bg-neutral-200 dark:hover:bg-neutral-500": !isHovered,
				"bg-blue-200 border-blue-200 dark:bg-blue-400 dark:border-blue-400":
					isSelected,
				"rounded-b-lg": isEnd,
				"rounded-t-lg": isStart,
				"bg-rose-600 dark:bg-rose-500 dark:border-rose-500 border-rose-600":
					eventForCell?.type === CalendarEventType.MEETING,
				"bg-amber-500 dark:bg-amber-400 dark:border-amber-400 border-amber-500":
					eventForCell?.type === CalendarEventType.WORK,
				"bg-indigo-600 dark:bg-indigo-500 dark:border-indigo-500 border-indigo-600":
					eventForCell?.type === CalendarEventType.REMINDER,
				"bg-cyan-600 dark:bg-cyan-500 dark:border-cyan-500 border-cyan-600":
					eventForCell?.type === CalendarEventType.OTHER,
				"brightness-125": isHovered,
			})}
			onClick={onClick}
			onMouseEnter={() => handleMouseEnter(eventForCell)}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	)
}
