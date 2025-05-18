"use client"

import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import TagSection from "./_components/tag-section"
import TagModal from "./_components/_modals/tag-modal"
import { useTagStore } from "./_states/tag.state"
import TagDeleteModal from "./_components/_modals/tag-delete-modal"

const CreateTagButton = () => {
	const { update } = useTagStore(state => state)
	return (
		<Button onClick={() => update({ show: true, isEdit: false })}>
			<Icons.Actions.Add />
			Create Tag
		</Button>
	)
}

export default function Client() {
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<TagModal />
			<TagDeleteModal />

			<h1 className="text-2xl font-semibold">Tags</h1>
			<div className="bg-slate-100 p-2 rounded-lg">
				<CreateTagButton />
			</div>
			<div className="bg-slate-100 flex-1 rounded-lg grid grid-cols-2 gap-2 p-2 overflow-y-auto">
				<TagSection tags={["1", "2", "3"]} title="Global Tags" />
				<TagSection tags={["1", "2", "3"]} title="Tags for project" />
			</div>
		</div>
	)
}
