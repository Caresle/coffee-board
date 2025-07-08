import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { projectValidator } from "@/validators/project.validator"
import { NextRequest } from "next/server"
import { QueriesProject } from "./queries"
import { getAllProjects } from "@/actions/projects/get-all-projects"
import { getTokenData } from "@/actions/get-token-data"
import { appCache } from "@/lib/cache"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

const getProjects = async () => {
	try {
		const projects = await getAllProjects()
		return apiResponse({
			data: projects,
			message: "Projects retrieved successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const createProject = async (req: NextRequest) => {
	try {
		const data = projectValidator.parse(await req.json())
		const token = await getTokenData()

		if (!token) {
			return apiResponseError({ error: "Invalid token" })
		}

		const value = (
			await pgQuery(QueriesProject.createProject, [
				data.name,
				data.description,
				token.id,
				data.visibility,
			])
		)?.[0]

		await appCache.delete(CACHE_KEYS.projects(token?.id))

		return apiResponse({ data: value, message: "Project created successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const GET = async () =>
	hasAccess({ method: getProjects, permission: PERMISSIONS.ReadProjects.name })

export const POST = async (req: NextRequest) =>
	hasAccess({
		permission: PERMISSIONS.CreateProject.name,
		method: createProject,
		req,
	})
