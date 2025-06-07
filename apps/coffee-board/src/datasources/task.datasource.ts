import { Task } from "@/entities/task.entity"
import { GeneralDatasource } from "./general.datasource"

export interface TaskDatasource extends GeneralDatasource<Task> {
	getByBoardDetId(id: number): Promise<Task[]>
}
