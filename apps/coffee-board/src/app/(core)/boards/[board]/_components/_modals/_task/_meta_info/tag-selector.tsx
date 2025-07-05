import { useMemo, useState } from "react"
import GeneralSelector from "../general-selector"
import Icons from "@/components/shared/icons"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/queryKeys"
import { useTaskStore } from "../../../../_states/task.state"
import tagService from "@/services/tag.service"
import { getContrastText } from "@/helpers/utils"
import { Tag } from "@/entities/tag.entity"
import useTaskTag from "../../../../_hook/use-task-tag"

const TagList = () => {
	const { item } = useTaskStore(state => state)

	if (item?.tags?.length === 0) return <></>

	const tagsToDisplay = item?.tags?.slice(0, 2)

	return (
		<>
			{tagsToDisplay.map(tag => {
				const color = getContrastText(tag.color)

				return (
					<div
						key={`tag-${tag.id}-display`}
						className="py-1 px-2 rounded-md"
						style={{
							color,
							backgroundColor: tag.color,
						}}
					>
						{tag.name}
					</div>
				)
			})}
			{item?.tags?.length > 2 && <div>+{item?.tags?.length - 2}</div>}
		</>
	)
}

const TagCommandItem = ({
	tag,
	onSelect,
}: {
	tag: Tag
	onSelect: (tag: Tag) => void
}) => {
	const color = getContrastText(tag.color)
	return (
		<CommandItem
			className="mt-1 font-semibold cursor-pointer transition-all hover:brightness-105 w-full"
			style={{
				backgroundColor: tag.color,
				color,
			}}
			onSelect={() => onSelect(tag)}
		>
			{tag.name}
		</CommandItem>
	)
}

export default function TagSelector() {
	const { show, item } = useTaskStore(state => state)
	const [open, setOpen] = useState(false)
	const { addTagToTask, removeTagFromTask } = useTaskTag()

	const QTags = useQuery({
		queryKey: [queryKeys.tags],
		queryFn: () => tagService.getTags(),
		enabled: show && !!item,
	})

	const tags = useMemo(() => {
		const allTags = QTags?.data || []

		return allTags.filter(tag => !item?.tags?.find(t => t.id === tag.id))
	}, [QTags?.data, item])

	return (
		<GeneralSelector
			icon={<Icons.Misc.Tags />}
			title="Tags"
			triggerText="Add Tags"
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button className="w-full" variant={"ghost"}>
						{item.tags?.length > 0 ? <TagList /> : "Add Tags"}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Command>
						<CommandList>
							<CommandGroup>
								<div className="grid grid-cols-2 gap-1 max-h-[200px] overflow-y-auto">
									{item?.tags?.map(tag => (
										<TagCommandItem
											tag={tag}
											onSelect={removeTagFromTask}
											key={`tag-${tag.id}-selected`}
										/>
									))}
								</div>
							</CommandGroup>
						</CommandList>
						<CommandInput placeholder="Search Tag" />
						<CommandList>
							<CommandEmpty>
								<Button
									className="flex items-center gap-2 w-full"
									variant={"ghost"}
								>
									<Icons.Actions.Add className="size-5" />
									Create Tag
								</Button>
							</CommandEmpty>

							<CommandGroup>
								{tags.map(tag => (
									<TagCommandItem
										tag={tag}
										onSelect={addTagToTask}
										key={`tag-${tag.id}`}
									/>
								))}
								{tags.length === 0 && (
									<span>No more tags, write to create one</span>
								)}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</GeneralSelector>
	)
}
