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
import { Project } from "@/entities/project.entity"
import Icons from "@/components/shared/icons"
import { useProject } from "../_hook/use-project"

export default function ProjectCard() {
	const { project } = useProject()
	const router = useRouter()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{project.visibility === "private" && <Icons.Misc.Private />}
						{project.id} - {project.name}
					</div>
					<ProjectActions />
				</CardTitle>
				<CardDescription>{project.description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button
					variant={"secondary"}
					onClick={() => router.push(`/boards/${project.id}`)}
				>
					Go to project
				</Button>
			</CardFooter>
		</Card>
	)
}
