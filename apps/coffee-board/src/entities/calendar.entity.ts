export enum CalendarEventType {
	WORK = "work",
	MEETING = "meeting",
	REMINDER = "reminder",
	OTHER = "other",
}

export interface CalendarEvent {
	id: number
	dateBegin?: Date
	dateEnd?: Date
	timeStart: number
	timeEnd: number
	column: number
	type?: CalendarEventType
}
