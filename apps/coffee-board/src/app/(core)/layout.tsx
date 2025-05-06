import TopBar from "@/components/shared/top-bar"
import React from "react"

export default function CoreLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="h-full bg-orange-50 flex flex-col select-none overflow-y-auto">
			<TopBar />
			<main className="flex-1 overflow-y-auto p-2">{children}</main>
		</div>
	)
}
