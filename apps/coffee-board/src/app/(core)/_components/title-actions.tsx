import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import React from "react"

export default function TitleActions() {
	return (
		<div className="flex gap-2 items-center">
			<div className="flex items-center gap-1">
				<Avatar>
					<AvatarFallback>U</AvatarFallback>
				</Avatar>

				<Avatar>
					<AvatarFallback>U</AvatarFallback>
				</Avatar>

				<Avatar>
					<AvatarFallback>+2</AvatarFallback>
				</Avatar>
			</div>
			<Button variant={"outline"}>Share</Button>
		</div>
	)
}
