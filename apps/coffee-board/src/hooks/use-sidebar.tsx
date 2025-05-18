"use client"

import { useState } from "react"

export function useSidebar() {
	const [active, setActive] = useState("")

	const setActiveItem = (key: string) => {
		setActive(key)
	}

	return {
		active,
		setActiveItem,
	}
}
