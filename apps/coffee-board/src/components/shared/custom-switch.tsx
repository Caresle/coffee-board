import { Switch } from "../ui/switch"
import React from "react"

import { cn } from "@/lib/utils"

export default function CustomSwitch({
	className,
	...props
}: {
	className: string
}) {
	return (
		<Switch
			className={cn(
				"data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-600",
				className,
			)}
			{...props}
		/>
	)
}
