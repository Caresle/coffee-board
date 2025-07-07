import React from "react"
import TagSection from "./tag-section"
import { useTags } from "../_hook/use-tags"
import Icons from "@/components/shared/icons"

const NoTags = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-2 flex-1 dark:text-neutral-500 transition-all animate-pulse text-neutral-500">
			<Icons.Misc.NoData className="size-32" />
			<div className="font-semibold text-2xl">No tags found.</div>
		</div>
	)
}

export default function TagContainers() {
	const { QTags, tags } = useTags()

	const isLoading = QTags.isLoading

	return (
		<div className="bg-slate-100 flex-1 rounded-lg grid gap-2 p-2 overflow-y-auto dark:bg-neutral-900">
			{isLoading && <div>Loading...</div>}
			{!isLoading && tags?.length === 0 && <NoTags />}
			{!isLoading && tags?.length > 0 && <TagSection title="Global Tags" />}
		</div>
	)
}
