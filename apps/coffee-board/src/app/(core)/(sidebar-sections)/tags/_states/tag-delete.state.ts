import { Tag } from "@/entities/tag.entity"
import { create } from "zustand"

interface TagDeleteState {
	show: boolean
	item: Tag
	update: (data: Partial<TagDeleteState>) => void
}

export const useTagDeleteStore = create<TagDeleteState>(set => ({
	show: false,
	item: {} as Tag,
	update: data => set({ ...data }),
}))
