import { getAllTags } from "@/actions/tags/get-all-tags"
import { TagDatasource } from "@/datasources/tag.datasource"
import { Tag } from "@/entities/tag.entity"
import { getTagById as geTagByIdAction } from "@/actions/tags/get-tag-by-id"
import { axiosInstance } from "@/lib/axios"

const BASE_ROUTE = "/tags"

class TagService implements TagDatasource {
	async getTags(): Promise<Tag[]> {
		return getAllTags()
	}

	async getTagById(id: number): Promise<Tag | null> {
		return geTagByIdAction(id)
	}

	async createTag(tag: Omit<Tag, "id">): Promise<Tag | null> {
		try {
			const response = await axiosInstance.post(BASE_ROUTE, tag)
			return response.data as Tag
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async updateTag(tag: Tag): Promise<Tag | null> {
		try {
			const response = await axiosInstance.put(`${BASE_ROUTE}/${tag.id}`, tag)
			console.log(response.data)
			return {} as Tag
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async deleteTag(id: number): Promise<void> {
		try {
			await axiosInstance.delete(`${BASE_ROUTE}/${id}`)
		} catch (error) {
			console.error(error)
			return
		}
	}
}

const tagService = new TagService()

export default tagService
