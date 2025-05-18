import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { projectValidator } from "@/validators/project.validator"
import { NextRequest } from "next/server"
import { QueriesProject } from "./queries"
import { getAllProjects } from "@/actions/projects/get-all-projects"

export async function GET() {
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

export async function POST(req: NextRequest) {
	try {
		const data = projectValidator.parse(await req.json())
		const value = (
			await pgQuery(QueriesProject.createProject, [
				data.name,
				data.description,
				1, // TODO: CHANGE FOR USER ID
				//data.id_user,
				data.visibility,
			])
		)?.[0]

		return apiResponse({ data: value, message: "Project created successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
