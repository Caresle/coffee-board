import { getTokenData } from "@/actions/get-token-data"
import { NextRequest } from "next/server"

/**
 * Helper function to wrap the route handler methods to allow to check if the user
 * has the permission to access the endpoint.
 */
export const hasAccess = async <T>(
	permission: string,
	req: NextRequest,
	params: Promise<T>,
	method: (req: NextRequest, params: Promise<T>) => Promise<T>,
) => {
	const token = await getTokenData()

	if (!token) return Response.json({ message: "Unauthorized" }, { status: 401 })

	// if (!token.permissions?.includes(permission))
	// 	return Response.json({ message: "Forbidden" }, { status: 403 })

	return method(req, params)
}
