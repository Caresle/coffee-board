import { CalendarEvent, CalendarEventType } from "@/entities/calendar.entity"
import { createContext, useContext, useState } from "react"
import { CalendarCellValues } from "../_states/calendar.state"

interface CreateEventParams {
	selectedCell: CalendarCellValues
	column: number
	value: number
}

interface CalendarContextProps {
	events: CalendarEvent[]
	setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
	createEvent: ({}: CreateEventParams) => void
	hoverEvent: CalendarEvent | null
	setHoverEvent: (event: CalendarEvent | null) => void
	handleMouseEnter: (eventForCell: CalendarEvent | null) => void
	handleMouseLeave: () => void
}

const CalendarContent = createContext<CalendarContextProps>({
	events: [],
	setEvents: () => {},
	createEvent: () => {},
	hoverEvent: null,
	setHoverEvent: () => {},
	handleMouseEnter: () => {},
	handleMouseLeave: () => {},
})

export const useCalendar = () => useContext(CalendarContent)

export const CalendarProvider = ({
	initialEvents = [],
	children,
}: {
	initialEvents?: CalendarEvent[]
	children: React.ReactNode
}) => {
	const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
	const [hoverEvent, setHoverEvent] = useState<CalendarEvent | null>(null)

	const createEvent = ({ selectedCell, column, value }: CreateEventParams) => {
		const newEvent: CalendarEvent = {
			id: events.length + 1,
			timeStart: selectedCell.start < value ? selectedCell.start : value,
			timeEnd: value > selectedCell.start ? value : selectedCell.start,
			column,
			type: [
				CalendarEventType.WORK,
				CalendarEventType.MEETING,
				CalendarEventType.REMINDER,
				CalendarEventType.OTHER,
			][Math.floor(Math.random() * 4)],
		}

		setEvents([...events, newEvent])
	}

	const handleMouseEnter = (eventForCell: CalendarEvent | null) => {
		if (!eventForCell) return

		setHoverEvent(eventForCell)
	}

	const handleMouseLeave = () => {
		setHoverEvent(null)
	}

	const value: CalendarContextProps = {
		events,
		setEvents,
		createEvent,
		hoverEvent,
		setHoverEvent,
		handleMouseEnter,
		handleMouseLeave,
	}

	return <CalendarContent value={value}>{children}</CalendarContent>
}
