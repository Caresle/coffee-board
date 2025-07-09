"use client"

import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import TagModal from "./_components/_modals/tag-modal"
import { useTagStore } from "./_states/tag.state"
import TagDeleteModal from "./_components/_modals/tag-delete-modal"
import { Tag } from "@/entities/tag.entity"
import { TagProvider } from "./_hook/use-tags"
import TagContainers from "./_components/tag-containers"

const CreateTagButton = () => {
	const { update } = useTagStore(state => state)
	return (
		<Button onClick={() => update({ show: true, isEdit: false })}>
			<Icons.Actions.Add />
			Create Tag
		</Button>
	)
}

export default function Client({ initialTags = [] }: { initialTags: Tag[] }) {
	return (
		<TagProvider tags={initialTags}>
			<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
				<TagModal />
				<TagDeleteModal />

				<h1 className="text-2xl font-semibold">Tags</h1>
				<div className="bg-slate-100 p-2 rounded-lg dark:bg-neutral-900">
					<CreateTagButton />
				</div>
				<TagContainers />
			</div>
		</TagProvider>
	)
}
