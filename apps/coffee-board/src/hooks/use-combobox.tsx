"use client"

import { useState } from "react"

export type ComboboxState<T> = {
	value: T | null
	set: (value: T) => void
	reset: () => void
	clear: () => void
}

/**
 * Custom hook to manage the state of the combobox
 * @param initialValue { T | null } - The initial value of the combobox
 * @returns
 */
export function useCombobox<T>(initialValue: T | null = null) {
	const [value, setValue] = useState<T | null>(initialValue)

	const set = (value: T) => {
		setValue(value)
	}

	const reset = () => {
		setValue(initialValue)
	}

	const clear = () => {
		setValue(null)
	}

	return {
		value,
		set,
		reset,
		clear,
	}
}
