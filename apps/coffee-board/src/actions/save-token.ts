"use server"

import { COOKIE_NAMES } from "@/constants/cookies-names"
import { cookies } from "next/headers"

export const saveToken = async (token: string) => {
	const cookieHandler = await cookies()

	cookieHandler.set(COOKIE_NAMES.token, token, {
		httpOnly: true,
		sameSite: "strict",
		value: token,
		maxAge: 60 * 60 * 24 * 7,
	})
}
