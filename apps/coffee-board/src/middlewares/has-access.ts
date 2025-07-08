import { getAccess } from "@/actions/get-access"
import { getTokenData } from "@/actions/get-token-data"
import { NextRequest } from "next/server"

/**
 * Helper function to wrap the route handler methods to allow to check if the user
 * has the permission to access the endpoint.
 */
export const hasAccess = async <T>({
	permission,
	req,
	params,
	method,
}: {
	permission: string
	req?: NextRequest
	params?: T
	method:
		| ((req: NextRequest, params: T) => Promise<Response>)
		| ((req: NextRequest) => Promise<Response>)
}) => {
	const token = await getTokenData()

	if (!token) return Response.json({ message: "Unauthorized" }, { status: 401 })

	const permissions = await getAccess(token.username)

	if (!permissions?.map(p => p.name).includes(permission))
		return Response.json({ message: "Forbidden" }, { status: 403 })

	return method(req!, params!)
}
