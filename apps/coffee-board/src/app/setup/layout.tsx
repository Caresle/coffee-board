import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full bg-slate-50 flex flex-col select-none overflow-y-auto dark:bg-neutral-900">
			{children}
		</div>
	)
}
