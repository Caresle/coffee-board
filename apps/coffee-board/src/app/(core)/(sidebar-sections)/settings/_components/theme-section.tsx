import React from "react"
import ThemeCard from "./theme-card"

export default function ThemeSection() {
	return (
		<div className="grid lg:grid-cols-3 gap-2 grid-cols-1 md:grid-cols-2">
			<ThemeCard isActive />
			<ThemeCard />
			<ThemeCard />
		</div>
	)
}
