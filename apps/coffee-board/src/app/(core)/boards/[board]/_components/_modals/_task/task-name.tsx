import { Button } from "@/components/ui/button"
import React from "react"
import { useTaskStore } from "../../../_states/task.state"

export default function TaskName() {
	const { item } = useTaskStore.getState()

	return (
		<Button
			variant={"ghost"}
			className="w-full flex justify-start font-semibold text-2xl"
		>
			{item.name}
		</Button>
	)
}
