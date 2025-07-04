"use client"

import { queryKeys } from "@/constants/queryKeys"
import {
	TaskCheckList,
	TaskCheckListDetails,
	TaskCheckListHeader,
} from "@/entities/task.entity"
import taskService from "@/services/task.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext } from "react"

interface ChecklistTaskContext {
	QSubChecklist: UseQueryResult<TaskCheckList>
	checklist: TaskCheckList
	header: TaskCheckListHeader
	details: Array<TaskCheckListDetails>
}

const ChecklistTaskContext = createContext<ChecklistTaskContext>({
	QSubChecklist: {} as UseQueryResult<TaskCheckList>,
	checklist: {} as TaskCheckList,
	header: {} as TaskCheckListHeader,
	details: [] as Array<TaskCheckListDetails>,
})

/**
 * Context used to provide the specific checklist of the task,
 * for example if the task contains multiple checklist, this context
 * will provide information related with a single checklist.
 *
 */
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
	/**
	 * `QSubChecklist` is used to fetch the checklist of the task.
	 * don't confuse with the global section of the checklist
	 */
	const QSubChecklist = useQuery<TaskCheckList>({
		queryKey: [
			queryKeys.tasksChecklist,
			{
				id: checklist.header.id,
			},
		],
		queryFn: () =>
			taskService.getChecklistById(
				checklist.header.id_task,
				checklist.header.id,
			),
		initialData: checklist,
	})

	const header = QSubChecklist?.data?.header || ({} as TaskCheckListHeader)
	const details =
		QSubChecklist?.data?.details || ([] as Array<TaskCheckListDetails>)

	const value: ChecklistTaskContext = {
		checklist,
		QSubChecklist,
		header,
		details,
	}

	return <ChecklistTaskContext value={value}>{children}</ChecklistTaskContext>
}
