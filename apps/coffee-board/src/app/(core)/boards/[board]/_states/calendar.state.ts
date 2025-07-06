import { create } from "zustand"

export interface CalendarCellValues {
	start: number
	end: number
	columnStart: number
	columnEnd: number
}

interface CalendarState {
	update: (data: Partial<CalendarState>) => void
	selectedIndex: CalendarCellValues
}

export const useCalendarStore = create<CalendarState>(set => ({
	selectedIndex: { start: -1, end: -1, columnStart: -1, columnEnd: -1 },
	update: data => set({ ...data }),
}))
