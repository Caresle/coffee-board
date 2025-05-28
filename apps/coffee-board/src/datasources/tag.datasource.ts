import { Tag } from "@/entities/tag.entity"

export interface TagDatasource {
	getTags(): Promise<Tag[]>
	getTagById(id: number): Promise<Tag | null>
	createTag(tag: Omit<Tag, "id">): Promise<Tag | null>
	updateTag(tag: Tag): Promise<Tag | null>
	deleteTag(id: number): Promise<void>
}
