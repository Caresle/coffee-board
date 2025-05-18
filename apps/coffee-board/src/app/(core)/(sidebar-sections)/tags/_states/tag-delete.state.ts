import { create } from "zustand"

interface TagDeleteState {
	show: boolean
	update: (data: Partial<TagDeleteState>) => void
}

export const useTagDeleteStore = create<TagDeleteState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
