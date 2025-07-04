import { BoardDatasource } from "@/datasources/board.datasource"
import { Board } from "@/entities/board.entity"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = "/boards"

class BoardService implements BoardDatasource {
	getAll(): Promise<Board[]> {
		throw new Error("Method not implemented.")
	}
	getById(id: number): Promise<Board | null> {
		throw new Error("Method not implemented.")
	}
	async create(body: Omit<Board, "id">): Promise<Board | null> {
		try {
			const axiosResponse = await axiosInstance.post(BASE_ROUTE, body)
			const res: ApiResponse = axiosResponse.data

			return res.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async update(body: Board): Promise<Board | null> {
		try {
			const axiosResponse = await axiosInstance.put(
				`${BASE_ROUTE}/${body.id}`,
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
			const axiosResponse = await axiosInstance.delete(`${BASE_ROUTE}/${id}`)
			const res: ApiResponse = axiosResponse.data

			// return res.data
		} catch (error) {
			console.error(error)
			// return null
		}
	}
}

const boardService = new BoardService()

export default boardService
