import React from "react"
import Client from "./client"
import { getAllTags } from "@/actions/tags/get-all-tags"

export default async function TagPage() {
	const tags = await getAllTags()

	return <Client initialTags={tags} />
}
