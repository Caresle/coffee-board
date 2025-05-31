"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import Icons from "../icons"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { SearchItem } from "@/entities/search-item.entity"

export default function SearchButton() {
	const items: SearchItem[] = [
		{
			id: 1,
			title: "Item 1",
			description: "This is the description for item 1",
		},
		{
			id: 2,
			title: "Item 2",
			description: "This is the description for item 2",
		},
	]

	return (
		<div className="w-1/3">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={"secondary"} className="w-full">
						<Icons.Actions.Search />
						Search
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
					<Command>
						<CommandInput placeholder="Select" />
						<CommandList>
							<CommandEmpty>No results found</CommandEmpty>
							<CommandGroup>
								{items?.map((item, i) => (
									<CommandItem
										key={i}
										onSelect={() => {
											console.log(item)
										}}
										className="flex flex-col items-start"
									>
										<h3 className="font-semibold">{item.title}</h3>
										<p className="text-slate-700 dark:text-slate-300">
											{item.description}
										</p>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
