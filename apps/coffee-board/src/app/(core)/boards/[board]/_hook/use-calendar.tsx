import { CalendarEvent, CalendarEventType } from "@/entities/calendar.entity"
import { createContext, useContext, useRef, useState } from "react"
import { CalendarCellValues } from "../_states/calendar.state"
import { arrow, useFloating, UseFloatingReturn } from "@floating-ui/react"

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
	floating: UseFloatingReturn
	floatingOpen: boolean
	setFloatingOpen: React.Dispatch<React.SetStateAction<boolean>>
	draggingEvent: CalendarEvent | null
	setDraggingEvent: React.Dispatch<React.SetStateAction<CalendarEvent | null>>
}

const CalendarContent = createContext<CalendarContextProps>({
	events: [],
	setEvents: () => {},
	createEvent: () => {},
	hoverEvent: null,
	setHoverEvent: () => {},
	handleMouseEnter: () => {},
	handleMouseLeave: () => {},
	floating: {} as UseFloatingReturn,
	floatingOpen: false,
	setFloatingOpen: () => {},
	draggingEvent: null,
	setDraggingEvent: () => {},
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
	const arrowRef = useRef(null)
	const [floatingOpen, setFloatingOpen] = useState(false)
	const [draggingEvent, setDraggingEvent] = useState<CalendarEvent | null>(null)

	const { floatingStyles, refs, ...restFloating } = useFloating({
		open: floatingOpen,
		middleware: [
			arrow({
				element: arrowRef,
			}),
		],
	})

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
		floating: {
			refs,
			floatingStyles,
			...restFloating,
		},
		floatingOpen,
		setFloatingOpen,
		draggingEvent,
		setDraggingEvent,
	}

	return <CalendarContent value={value}>{children}</CalendarContent>
}
