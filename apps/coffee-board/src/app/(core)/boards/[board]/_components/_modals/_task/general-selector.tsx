import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"

interface GeneralSelectorProps {
	icon?: React.ReactNode
	title?: string
	triggerText?: string
	children?: React.ReactNode
}

export default function GeneralSelector({
	icon: Icon,
	title,
	triggerText,
	children,
}: GeneralSelectorProps) {
	return (
		<div className="flex items-center gap-2 w-full">
			<div className="flex items-center gap-2 w-full">
				{Icon}
				{title}
			</div>
			<div className="w-full">
				{children || (
					<Button variant={"ghost"} className="w-full">
						{triggerText}
					</Button>
				)}
			</div>
		</div>
	)
}
