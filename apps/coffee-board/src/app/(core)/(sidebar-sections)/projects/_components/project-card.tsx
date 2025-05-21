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
import ProjectActions from "./project-actions"

export default function ProjectCard() {
	const router = useRouter()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<div>Project 1</div>
					<ProjectActions />
				</CardTitle>
				<CardDescription>Description</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button variant={"secondary"} onClick={() => router.push("/boards/1")}>
					Go to project
				</Button>
			</CardFooter>
		</Card>
	)
}
