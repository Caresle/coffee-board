import React from "react"
import Client from "./client"
import { getAllPriorities } from "@/actions/priority/get-all-priorities"

export default async function PrioritiesPage() {
	const data = await getAllPriorities()

	return <Client initialPriorities={data} />
}
