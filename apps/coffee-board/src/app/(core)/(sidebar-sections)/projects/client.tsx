"use client"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import React from "react"

export default function Client() {
	const router = useRouter()
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<h1 className="text-2xl font-semibold">Projects</h1>

			<div className="flex-1 overflow-y-auto bg-slate-100 rounded-lg">
				<div className="gap-2 overflow-y-auto p-2 grid grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>Project 1</CardTitle>
							<CardDescription>Description</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button
								variant={"secondary"}
								onClick={() => router.push("/boards/1")}
							>
								Go to project
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	)
}
