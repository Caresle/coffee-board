export interface Permission {
	id: number
	name: string
	action_type: "GET" | "POST" | "PUT" | "DELETE"
	allowed: number
}
