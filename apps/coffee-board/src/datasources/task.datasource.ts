import { Task, TaskCheckList, type TaskQuick } from "@/entities/task.entity"
import { GeneralDatasource } from "./general.datasource"

export interface TaskDatasource extends GeneralDatasource<Task> {
	getByBoardDetId(id: number): Promise<Task[]>
	createQuickTask(body: TaskQuick): Promise<Task | null>
	addChecklistItem(body: TaskCheckList): Promise<void>
}
