import React, { useState } from "react"
import CalendarHeader from "./calendar-header"
import CalendarWeek from "./calendar-week"
import CalendarContent from "./calendar-content"
import { CalendarProvider, useCalendar } from "../../_hook/use-calendar"
import EventPopover from "./event-popover/event-popover"
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	MouseSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core"
import { CalendarEvent } from "@/entities/calendar.entity"

const Content = () => {
	const { setDraggingEvent } = useCalendar()
	const [parent, setParent] = useState<string | null>(null)

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 0,
		},
	})

	const sensors = useSensors(mouseSensor)

	const onDragStart = (event: DragStartEvent) => {
		setParent(event.active.id as string)
		setDraggingEvent(event.active.data.current?.event as CalendarEvent)
	}

	const onDragEnd = (event: DragEndEvent) => {
		const { over } = event

		setParent(null)
		setDraggingEvent(null)

		if (!over) return
	}

	return (
		<>
			<EventPopover />
			<div className="flex-1 overflow-y-auto flex overflow-x-auto flex-col">
				<CalendarHeader />
				<CalendarWeek />
				<DndContext
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					sensors={sensors}
				>
					<DragOverlay>{parent && <div>{parent}</div>}</DragOverlay>
					<CalendarContent />
				</DndContext>
			</div>
		</>
	)
}

export default function CalendarView() {
	return (
		<CalendarProvider>
			<Content />
		</CalendarProvider>
	)
}
