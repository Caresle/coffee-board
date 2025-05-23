import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"

export default function CalendarHeader() {
	return (
		<div className="flex justify-between items-center p-2">
			<h2 className="text-2xl font-semibold">May 2025</h2>
			<div className="flex items-center gap-2">
				<Button variant={"secondary"} size={"icon"}>
					<Icons.Actions.PaginationLeft />
				</Button>
				<Button variant={"secondary"} size={"icon"}>
					<Icons.Actions.PaginationRight />
				</Button>
			</div>
		</div>
	)
}
