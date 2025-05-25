import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"

export default function OverviewSubCard({
	children,
	title = "",
}: {
	children?: React.ReactNode
	title: string
}) {
	return (
		<div className="bg-white rounded-lg border p-2 col-span-6 flex flex-col gap-1 dark:bg-neutral-800">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-lg">{title}</h3>
				<TooltipBasic title="Actions">
					<Button variant={"secondary"}>
						<Icons.Misc.MenuVertical />
					</Button>
				</TooltipBasic>
			</div>
			<div className="flex-1 rounded-lg bg-red-100">{children}</div>
			<div>Footer</div>
		</div>
	)
}
