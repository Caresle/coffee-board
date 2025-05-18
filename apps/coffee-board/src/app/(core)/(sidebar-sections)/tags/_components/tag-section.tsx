import React from "react"
import TagItem from "./tag-item"

export default function TagSection({
	tags,
	title,
}: {
	tags: Array<string>
	title: string
}) {
	return (
		<div className="bg-white rounded-lg p-2 border flex flex-col gap-2 overflow-y-auto">
			<h2>{title}</h2>
			<div className="flex-1 bg-slate-100 overflow-y-auto rounded-lg flex flex-col gap-2 p-2">
				{tags.map((tag, index) => (
					<TagItem key={index} tag={tag} />
				))}
			</div>
		</div>
	)
}
