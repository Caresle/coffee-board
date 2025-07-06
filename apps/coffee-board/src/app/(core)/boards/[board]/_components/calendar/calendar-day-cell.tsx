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
			className={cn(
				"border transition-all hover:bg-orange-200 cursor-pointer dark:hover:bg-orange-700",
				{
					"bg-blue-200 border-blue-200 dark:bg-blue-400 dark:border-blue-400":
						isSelected,
					"rounded-b-lg": isEnd,
					"rounded-t-lg": isStart,
					"bg-purple-200 dark:bg-indigo-800 dark:border-indigo-800 border-purple-200":
						eventForCell?.type === CalendarEventType.MEETING,
					"bg-teal-200 dark:bg-teal-700 dark:border-teal-700 border-teal-200":
						eventForCell?.type === CalendarEventType.WORK,
					"bg-amber-200 dark:bg-amber-700 dark:border-amber-700 border-amber-200":
						eventForCell?.type === CalendarEventType.REMINDER,
					"bg-rose-200 dark:bg-rose-700 dark:border-rose-700 border-rose-200":
						eventForCell?.type === CalendarEventType.OTHER,
					"bg-orange-200 dark:bg-orange-700 border-orange-200 dark:border-orange-700":
						isHovered,
				},
			)}
			onClick={onClick}
			onMouseEnter={() => handleMouseEnter(eventForCell)}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	)
}
