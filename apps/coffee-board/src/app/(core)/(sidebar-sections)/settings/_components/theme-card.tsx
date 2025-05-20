import Icons from "@/components/shared/icons"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import React from "react"

export default function ThemeCard({ isActive }: { isActive?: boolean }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Theme name</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="bg-slate-300 flex-1 h-64"></div>
			</CardContent>
			<CardFooter>
				<div
					className={cn(
						"border rounded-full p-2 flex items-center justify-center mr-2 size-8",
						{
							"bg-orange-500 text-white border-orange-500": isActive,
						},
					)}
				>
					{isActive && <Icons.Actions.Accept />}
				</div>
				Theme
			</CardFooter>
		</Card>
	)
}
