import { cn } from "@/lib/utils"
import { useCalendarStore } from "../../_states/calendar.state"
import { useCalendar } from "../../_hook/use-calendar"
import { CalendarEventType } from "@/entities/calendar.entity"
import { useEventPopoverStore } from "@/states/event-popover.state"
import useCalendarCell from "../../_hook/use-calendar-cell"

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

	const {
		events,
		createEvent,
		handleMouseEnter,
		handleMouseLeave,
		hoverEvent,
		floating,
		draggingEvent,
	} = useCalendar()

	const {
		eventForCell,
		isEnd,
		isStart,
		isSelected,
		setNodeRef,
		attributes,
		listeners,
	} = useCalendarCell({
		column,
		value,
		events,
	})

	const {
		update: updateEventPopover,
		item,
		show,
	} = useEventPopoverStore(state => state)

	const { refs } = floating

	const onClick = () => {
		if (eventForCell) {
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
			ref={
				show && item?.id === eventForCell?.id ? refs.setReference : setNodeRef
			}
			{...listeners}
			{...attributes}
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
				"opacity-25":
					eventForCell &&
					draggingEvent &&
					eventForCell?.id === draggingEvent?.id,
			})}
			onClick={onClick}
			onMouseEnter={() => handleMouseEnter(eventForCell)}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	)
}
