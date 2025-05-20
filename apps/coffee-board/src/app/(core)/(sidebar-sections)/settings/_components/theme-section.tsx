import React from "react"
import ThemeCard from "./theme-card"

export default function ThemeSection() {
	return (
		<div className="grid grid-cols-3 gap-2">
			<ThemeCard isActive />
			<ThemeCard />
			<ThemeCard />
		</div>
	)
}
