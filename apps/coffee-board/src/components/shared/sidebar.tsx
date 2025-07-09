"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import ProjectTree from "./project-tree/project-tree"
import { Button } from "../ui/button"
import Icons from "./icons"
import TooltipBasic from "./tooltip-basic"

type SidebarItemProps = {
	icon: React.ElementType
	isActive?: boolean
	children: React.ReactNode
	href?: string
	isExpanded?: boolean
}

const SidebarItem = ({
	icon: Icon,
	children,
	isActive,
	href,
	isExpanded = true,
}: SidebarItemProps) => {
	const router = useRouter()

	const handleClick = () => {
		router.push(href ?? "#")
	}

	const Wrapper = ({
		children,
		name,
	}: {
		children: React.ReactNode
		name: string
	}) => {
		if (isExpanded) {
			return children
		}
		return (
			<TooltipBasic title={name} side="right">
				{children}
			</TooltipBasic>
		)
	}

	return (
		<Wrapper name={children as string}>
			<li
				onClick={handleClick}
				className={cn(
					"flex items-center gap-2 text-lg font-semibold p-2 rounded-lg transition-all hover:shadow-lg border border-transparent hover:border-blue-500 hover:scale-100 scale-95 cursor-pointer select-none hover:text-white hover:bg-blue-500",
					{
						"bg-blue-50 text-blue-500": isActive,
						"w-fit": !isExpanded,
					},
				)}
			>
				<Icon className="size-5" />
				{isExpanded && children}
			</li>
		</Wrapper>
	)
}

export default function Sidebar() {
	const pathname = usePathname()
	const [isExpanded, setIsExpanded] = useState(true)
	const activeRoute = ROUTES.filter(route => {
		const currentRoute = pathname.split("/")?.[1]
		const routePath = route.path?.split("/")?.[1]

		if (currentRoute !== "" && routePath === "") return false

		return currentRoute.includes(routePath)
	})?.[0]

	const ExpandedButton = () => {
		return (
			<>
				<Icons.Actions.FirstPage className="size-5" />
				Coffee Board
			</>
		)
	}

	return (
		<div
			className={cn(
				"bg-white border rounded-lg w-1/5 p-1 dark:bg-neutral-800 hidden md:flex flex-col",
				{
					"w-fit": !isExpanded,
				},
			)}
		>
			<Button
				variant={"ghost"}
				size={isExpanded ? "default" : "icon"}
				onClick={() => setIsExpanded(!isExpanded)}
				className={cn("w-full flex justify-start items-center", {
					"justify-center items-center": !isExpanded,
				})}
			>
				{isExpanded && <ExpandedButton />}

				{!isExpanded && <Icons.Actions.LastPage className="size-5" />}
			</Button>
			<ul className={cn("flex flex-col gap-1", { "w-fit": !isExpanded })}>
				{ROUTES.map((route, index) => (
					<SidebarItem
						icon={route.icon}
						href={route.path}
						key={index}
						isActive={activeRoute?.path === route.path}
						isExpanded={isExpanded}
					>
						{route.name}
					</SidebarItem>
				))}
			</ul>
			{isExpanded && <ProjectTree />}
		</div>
	)
}
