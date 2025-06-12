"use client"

import {
	TaskCheckList,
	TaskCheckListDetails,
	TaskCheckListHeader,
} from "@/entities/task.entity"
import { createContext, useContext } from "react"

interface ChecklistTaskContext {
	checklist: TaskCheckList
	header: TaskCheckListHeader
	details: Array<TaskCheckListDetails>
}

const ChecklistTaskContext = createContext<ChecklistTaskContext>({
	checklist: {} as TaskCheckList,
	header: {} as TaskCheckListHeader,
	details: [] as Array<TaskCheckListDetails>,
})

export function useChecklistTaskContext() {
	return useContext(ChecklistTaskContext)
}

export function CheckListTaskProvider({
	children,
	checklist,
}: {
	children: React.ReactNode
	checklist: TaskCheckList
}) {
	const value: ChecklistTaskContext = {
		checklist,
		header: checklist.header || {},
		details: checklist.details || [],
	}

	return <ChecklistTaskContext value={value}>{children}</ChecklistTaskContext>
}
