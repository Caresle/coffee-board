import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export default function TooltipBasic({
	children,
	title = "",
	side = "top",
}: {
	children: React.ReactNode
	title: string
	side?: "top" | "bottom" | "left" | "right"
}) {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent side={side}>{title}</TooltipContent>
		</Tooltip>
	)
}
