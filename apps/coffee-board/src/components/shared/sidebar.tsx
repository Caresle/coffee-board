"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { Separator } from "../ui/separator"
import ProjectTree from "./project-tree/project-tree"

type SidebarItemProps = {
	icon: React.ElementType
	isActive?: boolean
	children: React.ReactNode
	href?: string
}

const SidebarItem = ({
	icon: Icon,
	children,
	isActive,
	href,
}: SidebarItemProps) => {
	const router = useRouter()

	const handleClick = () => {
		router.push(href ?? "#")
	}

	return (
		<li
			onClick={handleClick}
			className={cn(
				"flex items-center gap-2 text-lg font-semibold p-2 rounded-lg transition-all hover:shadow-lg border border-transparent hover:border-blue-500 hover:scale-100 scale-95 cursor-pointer select-none hover:text-white hover:bg-blue-500",
				{
					"bg-blue-50 text-blue-500": isActive,
				},
			)}
		>
			<Icon className="size-5" />
			{children}
		</li>
	)
}

export default function Sidebar() {
	const pathname = usePathname()

	const activeRoute = ROUTES.filter(route => {
		const currentRoute = pathname.split("/")?.[1]
		const routePath = route.path?.split("/")?.[1]

		if (currentRoute !== "" && routePath === "") return false

		return currentRoute.includes(routePath)
	})?.[0]

	return (
		<div className="bg-white border rounded-lg w-1/5 p-1 dark:bg-neutral-800">
			<ul className="flex flex-col gap-1">
				{ROUTES.map((route, index) => (
					<SidebarItem
						icon={route.icon}
						href={route.path}
						key={index}
						isActive={activeRoute?.path === route.path}
					>
						{route.name}
					</SidebarItem>
				))}
			</ul>
			<ProjectTree />
		</div>
	)
}
