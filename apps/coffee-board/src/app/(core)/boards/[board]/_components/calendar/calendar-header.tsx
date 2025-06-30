import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { useTheme } from "next-themes"
import React from "react"

export default function CalendarHeader() {
	const { resolvedTheme } = useTheme()
	const date = moment().format("MMMM YYYY")
	const variant = resolvedTheme === "dark" ? "outline" : "secondary"

	return (
		<div className="flex justify-between items-center p-2">
			<h2 className="text-2xl font-semibold">{date}</h2>
			<div className="flex items-center gap-2">
				<TooltipBasic title="Previous Week">
					<Button variant={variant} size={"icon"}>
						<Icons.Actions.PaginationLeft />
					</Button>
				</TooltipBasic>
				<TooltipBasic title="Next Week">
					<Button variant={variant} size={"icon"}>
						<Icons.Actions.PaginationRight />
					</Button>
				</TooltipBasic>
			</div>
		</div>
	)
}
