export enum BoardVisibility {
	PUBLIC = "public",
	PRIVATE = "private",
}

export interface Board {
	id: number
	id_project: number
	name: string
	description: string | null
	deleted: number
	visibility: BoardVisibility
	details: any[]
}
