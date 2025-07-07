import { CalendarEvent } from "@/entities/calendar.entity"
import { create } from "zustand"

interface EventPopoverState {
	show: boolean
	item: CalendarEvent | null
	update: (data: Partial<EventPopoverState>) => void
}

export const useEventPopoverStore = create<EventPopoverState>(set => ({
	show: false,
	item: null,
	update: data => set({ ...data }),
}))
