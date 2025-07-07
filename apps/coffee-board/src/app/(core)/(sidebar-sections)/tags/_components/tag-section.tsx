import React from "react"
import TagItem from "./tag-item"
import { useTags } from "../_hook/use-tags"

export default function TagSection({ title }: { title: string }) {
	const { tags } = useTags()
	return (
		<div className="bg-white rounded-lg p-2 border flex flex-col gap-2 overflow-y-auto dark:bg-neutral-800">
			<h2>{title}</h2>
			<div className="flex-1 bg-slate-100 overflow-y-auto rounded-lg flex flex-col gap-2 p-2 dark:bg-neutral-900">
				{tags.map((tag, index) => (
					<TagItem key={index} tag={tag} />
				))}
			</div>
		</div>
	)
}
