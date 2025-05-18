import { ZodError } from "zod"

export interface ApiResponse {
	status: number
	message: string
	data: any
	errors: Array<string>
}

export const apiResponse = ({
	data,
	message,
	status,
}: {
	data: any
	message?: string
	status?: number
}): Response => {
	const body: ApiResponse = {
		data,
		errors: [],
		message: message ?? "success",
		status: status ?? 200,
	}

	return Response.json(body, { status: body.status })
}

export const apiResponseError = ({
	error,
	message,
	status,
}: {
	error: any
	message?: string
	status?: number
}): Response => {
	if (error instanceof SyntaxError) {
		return Response.json(
			{
				data: null,
				errors: [error.message],
				message: message ?? error.message,
				status: status ?? 400,
			},
			{ status: status ?? 400 },
		)
	}

	if (error instanceof ZodError) {
		const errors = error.flatten().fieldErrors
		return Response.json(
			{
				data: null,
				errors,
				message: message ?? "validation error",
				status: status ?? 400,
			},
			{ status: status ?? 400 },
		)
	}

	if (error instanceof Error) {
		return Response.json(
			{
				data: null,
				errors: [error.message],
				message: message ?? error.message,
				status: status ?? 500,
			},
			{ status: status ?? 500 },
		)
	}

	return Response.json(
		{
			data: null,
			errors: [],
			message: message ?? "Something went wrong",
			status: status ?? 500,
		},
		{ status: status ?? 500 },
	)
}
