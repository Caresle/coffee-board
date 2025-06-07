import { TaskDatasource } from "@/datasources/task.datasource"
import { Task } from "@/entities/task.entity"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = `/tasks`

class TaskService implements TaskDatasource {
	async getByBoardDetId(id: number): Promise<Task[]> {
		try {
			const res = await axiosInstance.get(BASE_ROUTE, {
				params: {
					id_board_det: id,
				},
			})

			return res.data.data as Task[]
		} catch (error) {
			console.error(error)
			return []
		}
	}

	getAll(): Promise<Task[]> {
		throw new Error("Method not implemented.")
	}
	getById(id: number): Promise<Task | null> {
		throw new Error("Method not implemented.")
	}
	create(body: Omit<Task, "id">): Promise<Task | null> {
		throw new Error("Method not implemented.")
	}
	update(body: Task): Promise<Task | null> {
		throw new Error("Method not implemented.")
	}
	delete(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

const taskService = new TaskService()

export default taskService
