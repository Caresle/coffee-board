import { CalendarEvent } from "@/entities/calendar.entity"
import { useDraggable } from "@dnd-kit/core"
import { useMemo } from "react"

export default function useCalendarCell({
	value,
	column,
	events,
}: {
	value: number
	column: number
	events: CalendarEvent[]
}) {
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

	const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
		id: `calendar-cell-${column}-${value}`,
		data: {
			value,
			column,
			event: eventForCell,
		},
		disabled: !eventForCell,
	})

	const calculateEventStatus = ({
		value,
		column,
	}: {
		value: number
		column: number
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

	const { isSelected, isEnd, isStart } = useMemo(() => {
		const result = calculateEventStatus({
			value,
			column,
		})

		return result
	}, [value, column, events])

	return {
		eventForCell,
		setNodeRef,
		isSelected,
		isEnd,
		isStart,
		listeners,
		attributes,
		isDragging,
	}
}
