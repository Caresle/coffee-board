import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Icons from "@/components/shared/icons"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>General</DropdownMenuLabel>
				<DropdownMenuItem>
					<Icons.Navbar.Users />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Icons.Actions.Settings />
					Settings
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const LogoSection = () => {
	return (
		<div className="w-fit flex items-center gap-2">
			<div className="size-6 bg-orange-500 rounded-full"></div>
			<div className="font-semibold">Coffee Board</div>
		</div>
	)
}

const SearchSection = () => {
	return (
		<div className="w-1/3">
			<Button variant={"secondary"} className="w-full">
				<Icons.Actions.Search />
				Search
			</Button>
		</div>
	)
}

const UserSection = () => {
	return (
		<div className="flex items-center gap-2 w-fit">
			<Button size={"icon"} variant={"secondary"}>
				<Icons.Actions.File />
			</Button>
			<Button size={"icon"} variant={"secondary"}>
				<Icons.Actions.Notification />
			</Button>
			<UserDropdown />
		</div>
	)
}

export default function TopBar() {
	return (
		<nav className="bg-white p-2 flex items-center justify-between">
			<LogoSection />
			<SearchSection />
			<UserSection />
		</nav>
	)
}
