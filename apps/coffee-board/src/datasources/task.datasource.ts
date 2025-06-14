import {
	Task,
	TaskCheckList,
	TaskCheckListHeader,
	type TaskQuick,
} from "@/entities/task.entity"
import { GeneralDatasource } from "./general.datasource"

export interface TaskCheckListDatasource {
	addChecklistHeader(body: TaskCheckListHeader): Promise<void>
	addChecklistItem(body: TaskCheckList): Promise<void>
	removeChecklistItem(id: number, body: TaskCheckList): Promise<void>
}

export interface TaskDatasource
	extends GeneralDatasource<Task>,
		TaskCheckListDatasource {
	getByBoardDetId(id: number): Promise<Task[]>
	createQuickTask(body: TaskQuick): Promise<Task | null>
}
