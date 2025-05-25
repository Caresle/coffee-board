import Sidebar from "@/components/shared/sidebar"
import TopBar from "@/components/shared/top-bar"
import React from "react"

export default function CoreLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="h-full bg-slate-50 flex flex-col select-none overflow-y-auto dark:bg-neutral-900">
			<TopBar />
			<main className="flex-1 overflow-y-auto p-2 flex gap-1">
				<Sidebar />
				<div className="bg-white border rounded-lg p-1 w-full flex flex-col overflow-y-auto dark:bg-neutral-800">
					{children}
				</div>
			</main>
		</div>
	)
}
