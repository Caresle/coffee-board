import { cn } from "@/lib/utils"
import React, { useMemo } from "react"
import { useCalendarStore } from "../../_states/calendar.state"

interface CalendarDayCellProps {
	value: number
	children: React.ReactNode
	column: number
}

export default function CalendarDayCell({
	value,
	children,
	column,
}: CalendarDayCellProps) {
	const { update, selectedIndex } = useCalendarStore(state => state)
	const isSelected = useMemo(() => {
		if (selectedIndex.start === value || selectedIndex.end === value) {
			return true
		}

		if (
			selectedIndex.columnStart !== column ||
			selectedIndex.columnEnd !== column
		) {
			return false
		}

		if (selectedIndex.start < value && selectedIndex.end > value) {
			return true
		}

		return false
	}, [value, column, selectedIndex])

	const onClick = () => {
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

		if (selectedIndex.end === -1) {
			update({
				selectedIndex: {
					start: selectedIndex.start,
					end: value,
					columnStart: selectedIndex.columnStart,
					columnEnd: column,
				},
			})
			return
		}
	}

	return (
		<div
			className={cn(
				"border transition-all hover:bg-orange-200 cursor-pointer dark:hover:bg-orange-700",
				{
					"bg-blue-200 border-blue-200 dark:bg-blue-400 dark:border-blue-400":
						isSelected,
				},
			)}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
