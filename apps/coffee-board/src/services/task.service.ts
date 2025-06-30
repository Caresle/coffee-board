import getChecklistByTask from "@/actions/tasks/checklist/get-checklist-by-task"
import { TaskDatasource } from "@/datasources/task.datasource"
import {
	Task,
	TaskCheckList,
	TaskCheckListHeader,
	TaskQuick,
} from "@/entities/task.entity"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance, axiosInstanceFormData } from "@/lib/axios"

const BASE_ROUTE = `/tasks`

class TaskService implements TaskDatasource {
	async uploadAttachment(id_task: number, file: File): Promise<boolean> {
		try {
			const formData = new FormData()
			formData.append("file_", file)
			const axiosResponse = await axiosInstanceFormData.post(
				`${BASE_ROUTE}/${id_task}/attachment`,
				formData,
			)
			const res: ApiResponse = axiosResponse.data

			return res.data
		} catch (error) {
			console.error(error)

			return false
		}
	}

	async getChecklistById(id_task: number, id: number): Promise<TaskCheckList> {
		try {
			const checklistData = await getChecklistByTask(id_task)
			const found = checklistData.find(c => c.header.id === id)

			if (!found) return {} as TaskCheckList
			return found
		} catch (error) {
			console.error(error)
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

	async createTaskHistory(id_task: number, msg: string): Promise<void> {
		try {
			const res = await axiosInstance.post(`${BASE_ROUTE}/${id_task}/history`, {
				msg,
				id_user: 1,
			})
			return
		} catch (error) {
			console.error(error)
			return
		}
	}

	async updateBoard(body: {
		id_task: number
		id_board_det: number
	}): Promise<void> {
		try {
			const res = await axiosInstance.put(
				`${BASE_ROUTE}/${body.id_task}/board`,
				body,
			)
			return
		} catch (error) {
			console.error(error)
			return
		}
	}
}

const taskService = new TaskService()

export default taskService
