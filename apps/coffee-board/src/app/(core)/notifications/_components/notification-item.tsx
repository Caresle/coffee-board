import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"

export interface NotificationItemProps {
	variant?: "success" | "error" | "warning" | "info" | "default"
}

export default function NotificationItem(
	{ variant }: NotificationItemProps = {
		variant: "default",
	},
) {
	return (
		<div
			className={cn(
				"bg-white rounded-lg p-2 border flex items-center gap-2 justify-between",
				{
					"text-green-800 border-green-500 bg-green-100": variant === "success",
					"text-red-800 border-red-500 bg-red-100": variant === "error",
					"text-yellow-800 border-yellow-500 bg-yellow-100":
						variant === "warning",
					"text-blue-800 border-blue-500 bg-blue-100": variant === "info",
				},
			)}
		>
			<div className="flex items-center gap-2">
				<div>
					<Icons.Actions.Notification />
				</div>
				NotificationItem
			</div>

			<TooltipBasic title="Delete">
				<Button variant={"ghost"}>
					<Icons.Actions.Delete />
				</Button>
			</TooltipBasic>
		</div>
	)
}
