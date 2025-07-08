"use server"

import { Permission } from "@/entities/permissions.entity"
import { pgQuery } from "@/lib/pg"

const query = `
    select f_get_access($1) access
`

export async function getAccess(username: string) {
	try {
		const { access } = (await pgQuery(query, [username]))?.[0] ?? { access: [] }

		return access as Permission[]
	} catch (error) {
		console.error(error)
		return []
	}
}
