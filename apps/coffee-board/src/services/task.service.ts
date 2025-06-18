import getChecklistByTask from "@/actions/tasks/checklist/get-checklist-by-task"
import { TaskDatasource } from "@/datasources/task.datasource"
import {
	Task,
	TaskCheckList,
	TaskCheckListHeader,
	TaskQuick,
} from "@/entities/task.entity"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = `/tasks`

class TaskService implements TaskDatasource {
	async getChecklistById(id_task: number, id: number): Promise<TaskCheckList> {
		try {
			const checklistData = await getChecklistByTask(id_task)
			const found = checklistData.find(c => c.header.id === id)

			if (!found) return {} as TaskCheckList
			return found
		} catch (error) {
			return {} as TaskCheckList
		}
	}

	async addChecklistHeader(body: TaskCheckListHeader): Promise<void> {
		try {
			const url = `${BASE_ROUTE}/${body.id_task}/checklist`
			const axiosResponse = await axiosInstance.post(url, body)
			const res: ApiResponse = axiosResponse.data

			return res.data
		} catch (error) {
			console.error(error)
			return
		}
	}

	async removeChecklistHeader(body: TaskCheckListHeader): Promise<void> {
		try {
			const url = `${BASE_ROUTE}/${body.id_task}/checklist/${body.id}`
			const axiosResponse = await axiosInstance.delete(url)
			const res: ApiResponse = axiosResponse.data

			return res.data
		} catch (error) {
			console.error(error)
			return
		}
	}

	async createQuickTask(body: TaskQuick): Promise<Task | null> {
		try {
			const res = await axiosInstance.post(BASE_ROUTE, body)

			return res.data.data as Task
		} catch (error) {
			console.error(error)
			return null
		}
	}

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

	async addChecklistItem(body: TaskCheckList): Promise<void> {
		try {
			const url = `${BASE_ROUTE}/${body.header.id_task}/checklist/${body.header.id}/item`
			const axiosResponse = await axiosInstance.post(url, body)
			const res: ApiResponse = axiosResponse.data

			return res.data
		} catch (error) {
			console.error(error)
			return
		}
	}

	async removeChecklistItem(id: number, body: TaskCheckList): Promise<void> {
		try {
			const url = `${BASE_ROUTE}/${body.header.id_task}/checklist/${body.header.id}/item/${id}`
			const axiosResponse = await axiosInstance.delete(url)
			const res: ApiResponse = axiosResponse.data

			return res.data
		} catch (error) {
			console.error(error)
			return
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

	async delete(id: number): Promise<void> {
		try {
			const res = await axiosInstance.delete(`${BASE_ROUTE}/${id}`)
			console.log(res.data)
		} catch (error) {
			console.error(error)
		}
	}
}

const taskService = new TaskService()

export default taskService
