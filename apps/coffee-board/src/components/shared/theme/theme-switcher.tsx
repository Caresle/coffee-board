"use client"
import React from "react"
import TooltipBasic from "../tooltip-basic"
import { Button } from "@/components/ui/button"
import Icons from "../icons"
import { useTheme } from "next-themes"

export default function ThemeSwitcher() {
	const { theme, setTheme, resolvedTheme } = useTheme()

	const onToggle = () => {
		const currentTheme = theme === "system" ? resolvedTheme : theme
		setTheme(currentTheme === "dark" ? "light" : "dark")
	}

	return (
		<TooltipBasic title="Swith Theme">
			<Button size={"icon"} variant={"secondary"} onClick={onToggle}>
				{theme === "dark" ? <Icons.Misc.Sun /> : <Icons.Misc.Moon />}
			</Button>
		</TooltipBasic>
	)
}
