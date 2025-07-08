import { apiResponse, apiResponseError } from "@/helpers/api-response"
import fileManager from "@/helpers/file-manager"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesAttachment } from "./queries"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface AttachmentParams {
	params: Promise<{ task: string }>
}

const createAttachment = async (
	req: NextRequest,
	{ params }: AttachmentParams,
) => {
	try {
		const { task } = await params

		const taskId = +task
		const formData = await req.formData()

		const attachments = []

		for (const [key, value] of formData.entries()) {
			if (key.includes("file_")) {
				const file = value as File
				const fileData = await fileManager.uploadFile(file, taskId)

				const attachment = (
					await pgQuery(QueriesAttachment.create, [
						taskId,
						fileData.name,
						fileData.type,
						fileData.path,
					])
				)?.[0]

				attachments.push(attachment)
			}
		}

		return apiResponse({
			message: "File uploaded successfully",
			data: {
				attachments,
			},
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const POST = async (req: NextRequest, params: AttachmentParams) =>
	hasAccess({
		method: createAttachment,
		permission: PERMISSIONS.CreateTasks.name,
		req,
		params,
	})
