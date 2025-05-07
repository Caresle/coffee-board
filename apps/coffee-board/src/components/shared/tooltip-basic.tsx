import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export default function TooltipBasic({
	children,
	title = "",
}: {
	children: React.ReactNode
	title: string
}) {
	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent>{title}</TooltipContent>
		</Tooltip>
	)
}
