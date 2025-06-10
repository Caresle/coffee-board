"use client"
import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import React from "react"
import { useViewSection } from "../../_hook/use-view-section"

export default function BoardAddButton() {
	const { resolvedTheme } = useTheme()
	const { setIsNewBoard } = useViewSection()

	const onAddBoard = () => {
		setIsNewBoard(true)

		setTimeout(() => {
			const el = document.getElementById("board-name")
			if (el) el.focus()
		}, 300)
	}

	return (
		<Button
			variant={resolvedTheme === "dark" ? "outline" : "secondary"}
			onClick={onAddBoard}
			className="w-[300px]"
		>
			<Icons.Actions.Add />
		</Button>
	)
}
