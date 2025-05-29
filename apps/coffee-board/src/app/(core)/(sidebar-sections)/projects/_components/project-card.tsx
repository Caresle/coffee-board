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

const ProjectCard = React.memo(function ProjectCard({
	project,
}: {
	project: Project
}) {
	const router = useRouter()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<div>
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
})

export default ProjectCard
