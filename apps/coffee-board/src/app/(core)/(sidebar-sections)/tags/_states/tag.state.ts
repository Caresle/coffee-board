import { Tag } from "@/entities/tag.entity"
import { create } from "zustand"

interface TagState {
	show: boolean
	isEdit: boolean
	item: Tag
	update: (data: Partial<TagState>) => void
}

export const useTagStore = create<TagState>(set => ({
	show: false,
	isEdit: false,
	item: {} as Tag,
	update: data => set({ ...data }),
}))
