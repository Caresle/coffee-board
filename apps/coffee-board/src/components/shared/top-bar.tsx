"use client"
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
import TooltipBasic from "./tooltip-basic"
import { useRouter } from "next/navigation"

const UserDropdown = () => {
	const router = useRouter()

	const goToProfile = () => {
		router.push("/profile")
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar>
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>General</DropdownMenuLabel>
				<DropdownMenuItem onClick={goToProfile}>
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
			<div className="size-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
				C
			</div>
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
	const router = useRouter()

	return (
		<div className="flex items-center gap-2 w-fit">
			<TooltipBasic title="Swith Theme">
				<Button size={"icon"} variant={"secondary"}>
					<Icons.Misc.Moon />
				</Button>
			</TooltipBasic>
			<TooltipBasic title="Profile">
				<Button size={"icon"} variant={"secondary"}>
					<Icons.Actions.File />
				</Button>
			</TooltipBasic>
			<TooltipBasic title="Notifications">
				<Button
					size={"icon"}
					variant={"secondary"}
					onClick={() => router.push("/notifications")}
				>
					<Icons.Actions.Notification />
				</Button>
			</TooltipBasic>
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
