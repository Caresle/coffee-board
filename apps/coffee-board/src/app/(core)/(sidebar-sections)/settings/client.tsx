"use client"

import React from "react"
import ThemeSection from "./_components/theme-section"
import { Separator } from "@/components/ui/separator"
import CustomSwitch from "@/components/shared/custom-switch"

export default function Client() {
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<h2 className="text-2xl font-semibold">Settings</h2>
			<ThemeSection />
			<Separator />
			<div className="flex items-center gap-2">
				Show Animations
				<CustomSwitch />
			</div>
		</div>
	)
}
