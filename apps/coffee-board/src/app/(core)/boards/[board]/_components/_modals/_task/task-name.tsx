import { Button } from "@/components/ui/button"
import React from "react"

export default function TaskName() {
	return (
		<Button
			variant={"ghost"}
			className="w-full flex justify-start font-semibold text-2xl"
		>
			Task Name
		</Button>
	)
}
