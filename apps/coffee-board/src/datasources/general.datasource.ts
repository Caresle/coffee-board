export interface GeneralDatasource<T> {
	getAll(): Promise<T[]>
	getById(id: number): Promise<T | null>
	create(body: Omit<T, "id">): Promise<T | null>
	update(body: T): Promise<T | null>
	delete(id: number): Promise<void>
}
