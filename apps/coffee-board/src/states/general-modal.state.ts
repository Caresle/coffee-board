import { create } from "zustand"

interface GeneralModalState<T> {
	show: boolean
	item: T
	update: (data: Partial<GeneralModalState<T>>) => void
}

export const createGeneralModalStore = <T>() => {
	return create<GeneralModalState<T>>(set => ({
		show: false,
		item: {} as T,
		update: data => set({ ...data }),
	}))
}
