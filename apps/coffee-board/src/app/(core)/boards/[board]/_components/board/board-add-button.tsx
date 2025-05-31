"use client"
import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import React from "react"

export default function BoardAddButton({
	onAddBoard,
}: {
	onAddBoard: () => void
}) {
	const { resolvedTheme } = useTheme()

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
