import { getProjectById } from "@/actions/projects/get-project-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import {
	projectDeleteValidator,
	projectUpdateValidator,
} from "@/validators/project.validator"
import { NextRequest } from "next/server"
import { QueriesProject } from "../queries"
import { getTokenData } from "@/actions/get-token-data"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { appCache } from "@/lib/cache"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface ProjectParams {
	params: Promise<{ project: string }>
}

const getProject = async (_: NextRequest, { params }: ProjectParams) => {
	try {
		const project = (await params).project
		const data = await getProjectById(+project)
		return apiResponse({ data, message: "Project retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const updateProject = async (req: NextRequest, { params }: ProjectParams) => {
	try {
		const project = (await params).project
		const json = await req.json()
		const token = await getTokenData()

		if (!token) {
			return apiResponseError({ error: "Invalid token" })
		}

		const validated = projectUpdateValidator.parse({ id: project, ...json })

		const data = (
			await pgQuery(QueriesProject.updateProject, [
				validated.name,
				validated.description,
				token.id,
				validated.visibility,
				validated.id,
			])
		)?.[0]

		await appCache.delete(CACHE_KEYS.projects(token?.id))

		return apiResponse({ data, message: "Project updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const deleteProject = async (_: NextRequest, { params }: ProjectParams) => {
	try {
		const project = (await params).project
		const token = await getTokenData()

		const id = projectDeleteValidator.parse({ id: project }).id

		const value = (await pgQuery(QueriesProject.deleteProjectSoft, [id]))?.[0]

		await appCache.delete(CACHE_KEYS.projects(token?.id || 0))

		return apiResponse({ data: value, message: "Project deleted successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const GET = async (req: NextRequest, params: ProjectParams) =>
	hasAccess<ProjectParams>({
		method: getProject,
		permission: PERMISSIONS.ReadProjects.name,
		params,
		req,
	})

export const PUT = async (req: NextRequest, params: ProjectParams) =>
	hasAccess<ProjectParams>({
		method: updateProject,
		permission: PERMISSIONS.UpdateProject.name,
		params,
		req,
	})

export const DELETE = async (req: NextRequest, params: ProjectParams) =>
	hasAccess<ProjectParams>({
		method: deleteProject,
		permission: PERMISSIONS.DeleteProject.name,
		params,
		req,
	})
