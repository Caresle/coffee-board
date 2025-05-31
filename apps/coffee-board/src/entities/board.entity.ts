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
	details: BoardDetails[]
}

export interface BoardDetails {
	id: number
	id_board: number
	name: string
	board_order: number
	deleted: number
}
