import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import React from "react"
import FilterDisplaySection from "./_components/filter-display-section"
import TitleActions from "./_components/title-actions"
import ProjectTitle from "./_components/project-title"

export default function Client() {
	return (
		<div className="flex flex-col gap-2 flex-1 overflow-y-auto p-2">
			<div className="flex items-center justify-between">
				<ProjectTitle />
				<TitleActions />
			</div>
			<FilterDisplaySection />
			<Separator />
			<div className="flex-1 overflow-y-auto grid grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center justify-between">
							<div>In progress</div>
							<div>
								<TooltipBasic title="Options">
									<Button variant={"ghost"}>
										<Icons.Misc.Menu className="size-5" />
									</Button>
								</TooltipBasic>

								<TooltipBasic title="Add">
									<Button variant={"ghost"}>
										<Icons.Actions.Add className="size-5" />
									</Button>
								</TooltipBasic>
							</div>
						</CardTitle>
					</CardHeader>
				</Card>
			</div>
		</div>
	)
}
