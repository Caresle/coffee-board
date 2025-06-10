import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { useViewSection } from "../../_hook/use-view-section"

export default function BoardNewInput() {
	const [name, setName] = useState("")
	const { setIsNewBoard } = useViewSection()

	return (
		<div className="dark:bg-neutral-900 p-2 h-fit rounded-lg bg-white border dark:border-neutral-700">
			<Input
				id="board-name"
				placeholder="Board name"
				value={name}
				onChange={e => setName(e.target.value)}
				onBlur={() => setIsNewBoard(false)}
				onKeyDown={e => {
					if (e.key === "Enter") {
						setIsNewBoard(false)
					}
				}}
			/>
		</div>
	)
}
