import { getAllProjects } from "@/actions/projects/get-all-projects"
import { getProjectById } from "@/actions/projects/get-project-by-id"
import { ProjectDatasource } from "@/datasources/project.datasource"
import { Project } from "@/entities/project.entity"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = "/projects"

class ProjectService implements ProjectDatasource {
	async getAll(): Promise<Project[]> {
		return getAllProjects()
	}

	async getById(id: number): Promise<Project | null> {
		return getProjectById(id)
	}

	async create(body: Omit<Project, "id">): Promise<Project | null> {
		try {
			const response = await axiosInstance.post(BASE_ROUTE, body)
			return response.data as Project
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async update(body: Project): Promise<Project | null> {
		try {
			const response = await axiosInstance.put(`${BASE_ROUTE}/${body.id}`, body)
			console.log(response.data)
			return {} as Project
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async delete(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`${BASE_ROUTE}/${id}`)
		} catch (error) {
			console.error(error)
			return
		}
	}
}

const projectService = new ProjectService()

export default projectService
