import React from "react"
import Client from "./client"
import { getAllProjects } from "@/actions/projects/get-all-projects"

export default async function ProjectsPage() {
	const initialProjects = await getAllProjects()
	return <Client initialProjects={initialProjects} />
}
