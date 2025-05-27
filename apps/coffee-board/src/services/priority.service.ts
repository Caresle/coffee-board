import { getAllPriorities } from "@/actions/priority/get-all-priorities"
import { getPriorityById as getPriorityByIdAction } from "@/actions/priority/get-priority-by-id"
import { PriorityDatasource } from "@/datasources/priority.datasource"
import { Priority } from "@/entities/priority.entity"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = "/priorities"

class PriorityService implements PriorityDatasource {
	async getPriorities(): Promise<Priority[]> {
		return getAllPriorities()
	}

	async getPriorityById(id: number): Promise<Priority | null> {
		return getPriorityByIdAction(id)
	}

	async createPriority(
		priority: Omit<Priority, "id">,
	): Promise<Priority | null> {
		try {
			const response = await axiosInstance.post(BASE_ROUTE, priority)
			return response.data as Priority
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async updatePriority(priority: Priority): Promise<Priority | null> {
		try {
			const response = await axiosInstance.put(
				`${BASE_ROUTE}/${priority.id}`,
				priority,
			)
			console.log(response.data)
			return {} as Priority
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async deletePriority(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`${BASE_ROUTE}/${id}`)
		} catch (error) {
			console.error(error)
			return
		}
	}
}

const priorityService = new PriorityService()

export default priorityService
