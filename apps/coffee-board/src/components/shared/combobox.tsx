import { useMemo, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command"
import { UseQueryResult } from "@tanstack/react-query"
import Icons from "./icons"
import { ComboboxState } from "@/hooks/use-combobox"

interface ComboboxProps<T> {
	Query: UseQueryResult<T[]>
	label: keyof T
	combobox: ComboboxState<T>
}

export default function Combobox<T>({
	Query,
	label,
	combobox,
}: ComboboxProps<T>) {
	const [open, setOpen] = useState(false)

	const items = useMemo(() => Query?.data, [Query?.data])

	return (
		<div className="w-full">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={open}
						className="w-full flex justify-between"
					>
						{combobox.value ? (
							String(
								items?.find(
									item =>
										item[label] === (combobox.value && combobox.value[label]),
								)?.[label],
							) ?? ""
						) : (
							<div className="text-slate-500">Select</div>
						)}
						{open ? (
							<Icons.Actions.DropdownClosed />
						) : (
							<Icons.Actions.DropdownOpen />
						)}
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
											setOpen(false)
											combobox.set(item)
										}}
									>
										{String(item[label])}
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
