import {
	Task,
	TaskCheckList,
	TaskCheckListHeader,
	type TaskQuick,
} from "@/entities/task.entity"
import { GeneralDatasource } from "./general.datasource"

export interface TaskCheckListDatasource {
	getChecklistById(id_task: number, id: number): Promise<TaskCheckList>
	addChecklistHeader(body: TaskCheckListHeader): Promise<void>
	addChecklistItem(body: TaskCheckList): Promise<void>
	removeChecklistItem(id: number, body: TaskCheckList): Promise<void>
	removeChecklistHeader(body: TaskCheckListHeader): Promise<void>
}

export interface TaskAttachmentDatasource {
	uploadAttachment(id_task: number, file: File): Promise<boolean>
}

export interface TaskHistoryDatasource {
	createTaskHistory(id_task: number, body: string): Promise<void>
}

export interface TaskDatasource
	extends GeneralDatasource<Task>,
		TaskCheckListDatasource,
		TaskAttachmentDatasource,
		TaskHistoryDatasource {
	getByBoardDetId(id: number): Promise<Task[]>
	createQuickTask(body: TaskQuick): Promise<Task | null>
	updateBoard(body: { id_task: number; id_board_det: number }): Promise<void>
}
