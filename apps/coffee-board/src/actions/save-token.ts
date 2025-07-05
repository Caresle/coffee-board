"use server"

import { cookies } from "next/headers"

export const saveToken = async (token: string) => {
	const cookieHandler = await cookies()

	cookieHandler.set("coffee-board-authtoken", token, {
		httpOnly: true,
		sameSite: "strict",
		value: token,
		maxAge: 60 * 60 * 24 * 7,
	})
}
