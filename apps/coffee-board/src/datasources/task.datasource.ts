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

export interface TaskDatasource
	extends GeneralDatasource<Task>,
		TaskCheckListDatasource {
	getByBoardDetId(id: number): Promise<Task[]>
	createQuickTask(body: TaskQuick): Promise<Task | null>
}
