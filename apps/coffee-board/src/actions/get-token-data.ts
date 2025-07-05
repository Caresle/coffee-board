"use server"

import { COOKIE_NAMES } from "@/constants/cookies-names"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"

interface TokenPayload {
	id: number
	username: string
	app_role: number
}

export const getTokenData = async (): Promise<TokenPayload | null> => {
	try {
		const cookiehandler = await cookies()
		const token = cookiehandler.get(COOKIE_NAMES.token)

		if (!token?.value) return null

		const payload = await verifyToken(token.value)

		return payload as TokenPayload
	} catch (error) {
		console.error(error)
		return null
	}
}
