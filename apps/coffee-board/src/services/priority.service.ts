import { getPriorityById as getPriorityByIdAction } from "@/actions/priority/get-priority-by-id"
import { PriorityDatasource } from "@/datasources/priority.datasource"
import { Priority } from "@/entities/priority.entity"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance } from "@/lib/axios"
import { AxiosResponse } from "axios"

const BASE_ROUTE = "/priorities"

class PriorityService implements PriorityDatasource {
	async getPriorities(): Promise<Priority[]> {
		try {
			const axiosRes: AxiosResponse = await axiosInstance.get(BASE_ROUTE)
			const res: ApiResponse = axiosRes.data as ApiResponse
			return res.data as Priority[]
		} catch (error) {
			console.error(error)
			return []
		}
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
			const response: AxiosResponse = await axiosInstance.put(
				`${BASE_ROUTE}/${priority.id}`,
				priority,
			)

			const res = response.data as ApiResponse
			return res.data as Priority
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
