export interface Project {
	id: number
	name: string
	description: string | null
	id_user: number
	visibility: "public" | "private"
	deleted: number
	username: string
	email: string
	boards: any[]
	created_at: string
}
