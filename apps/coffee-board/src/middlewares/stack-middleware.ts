/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { NextResponse } from "next/server"

export const stackMiddleware = (functions: Function[] = [], index = 0) => {
	const current = functions[index]

	if (current) {
		const next: any = stackMiddleware(functions, index + 1)
		if (typeof current === "function") {
			const fn = current as Function
			return fn(next)
		}
	}

	return () => NextResponse.next()
}
