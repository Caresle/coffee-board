import { CalendarEvent } from "@/entities/calendar.entity"
import { createContext, useContext, useState } from "react"

interface CalendarContextProps {
	events: CalendarEvent[]
	setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>
}

const CalendarContent = createContext<CalendarContextProps>({
	events: [],
	setEvents: () => {},
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

	const value: CalendarContextProps = {
		events,
		setEvents,
	}

	return <CalendarContent value={value}>{children}</CalendarContent>
}
