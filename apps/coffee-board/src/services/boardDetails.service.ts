import { BoardDetailsDatasource } from "@/datasources/boardDetails.datasource"
import { BoardDetails } from "@/entities/board.entity"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = "/boards"

class BoardDetailsService implements BoardDetailsDatasource {
	getAll(): Promise<BoardDetails[]> {
		throw new Error("Method not implemented.")
	}

	getById(id: number): Promise<BoardDetails | null> {
		throw new Error("Method not implemented.")
	}

	async create(body: Omit<BoardDetails, "id">): Promise<BoardDetails | null> {
		try {
			const axiosResponse = await axiosInstance.post(
				`${BASE_ROUTE}/${body.id_board}/details`,
				body,
			)
			const res: ApiResponse = axiosResponse.data
			return res.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async update(body: BoardDetails): Promise<BoardDetails | null> {
		try {
			const axiosResponse = await axiosInstance.put(
				`${BASE_ROUTE}/${body.id_board}/details/${body.id}`,
				body,
			)
			const res: ApiResponse = axiosResponse.data
			return res.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async delete(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`${BASE_ROUTE}/${id}/details/${id}`)
		} catch (error) {
			console.error(error)
		}
	}

	async archive(id: number): Promise<void> {
		try {
			await axiosInstance.put(`${BASE_ROUTE}/${id}/details/${id}/archive`)
		} catch (error) {
			console.error(error)
		}
	}
}

const boardDetailsService = new BoardDetailsService()

export default boardDetailsService
