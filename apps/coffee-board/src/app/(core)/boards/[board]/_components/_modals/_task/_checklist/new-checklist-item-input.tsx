import { Input } from "@/components/ui/input"
import React, { useState } from "react"

export default function NewChecklistItemInput({
	onBlur,
	onSubmit,
}: {
	onBlur?: () => void
	onSubmit?: (name: string) => void
}) {
	const [name, setName] = useState("")

	return (
		<div>
			<Input
				id="new-checklist-item-input"
				placeholder="New checklist item"
				onBlur={onBlur}
				value={name}
				onChange={e => setName(e.target.value)}
				onKeyDown={e => {
					if (e.key === "Enter") {
						onBlur?.()
						onSubmit?.(name)
					}
				}}
			/>
		</div>
	)
}
