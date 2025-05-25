"use server"

import { pgQuery } from "@/lib/pg"

const query = `select * from users where id = $1`

export async function getUserById(id: number) {
	try {
		const user = (await pgQuery(query, [id]))?.[0] ?? null

		const userToReturn = {
			username: user.username,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			app_role: user.app_role,
		}

		return userToReturn
	} catch (error) {
		console.error(error)
		return null
	}
}
