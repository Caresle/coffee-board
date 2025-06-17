import { apiResponse, apiResponseError } from "@/helpers/api-response"
import fileManager from "@/helpers/file-manager"
import { NextRequest } from "next/server"

interface AttachmentParams {
	params: Promise<{ task: string }>
}

export async function POST(req: NextRequest, { params }: AttachmentParams) {
	try {
		const { task } = await params

		const taskId = +task
		const formData = await req.formData()

		for (const [key, value] of formData.entries()) {
			if (key.includes("file_")) {
				const file = value as File
				const fileData = await fileManager.uploadFile(file, taskId)

				console.log(fileData)
			}
		}

		return apiResponse({
			message: "File uploaded successfully",
			data: {
				task,
			},
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
