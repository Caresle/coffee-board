import { getTokenData } from "@/actions/get-token-data"
import { NextRequest, NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const authUser = (next: Function) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	return async (req: NextRequest, _next: Function) => {
		const path = req.nextUrl.pathname

		const whiteListApi = ["/api/auth", "/api/users"]
		const whiteListRoutes = ["/login"]

		if (whiteListApi.some(route => path.startsWith(route)))
			return next(req, _next)

		if (whiteListRoutes.some(route => path.startsWith(route)))
			return next(req, _next)

		if (path.startsWith("/api/")) {
			const token = await getTokenData()

			if (!token)
				return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
		}

		return next(req, _next)
	}
}
