import { Priority } from "@/entities/priority.entity"

export interface PriorityDatasource {
	getPriorities(): Promise<Priority[]>
	getPriorityById(id: number): Promise<Priority | null>
	createPriority(priority: Omit<Priority, "id">): Promise<Priority | null>
	updatePriority(priority: Priority): Promise<Priority | null>
	deletePriority(id: number): Promise<void>
}
