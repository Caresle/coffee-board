"use client"
import Icons from "@/components/shared/icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import React from "react"

export default function Client() {
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<h1 className="text-2xl font-semibold">Members</h1>
			<div className="flex-1 overflow-y-auto bg-slate-100 rounded-lg">
				<div className="gap-2 overflow-y-auto p-2 grid grid-cols-3">
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Avatar>
											<AvatarFallback>UF</AvatarFallback>
										</Avatar>
										Member {index + 1}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<Button variant={"secondary"}>
										<Icons.Actions.Settings />
										Role
									</Button>
								</CardContent>
								<CardFooter>
									<Button className="w-full" variant={"secondary"}>
										<Icons.Actions.Edit />
										Edit
									</Button>
								</CardFooter>
							</Card>
						))}
				</div>
			</div>
		</div>
	)
}
