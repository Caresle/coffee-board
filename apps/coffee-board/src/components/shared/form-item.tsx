import React from "react"

export default function FormItem({
	children,
	title,
}: {
	children: React.ReactNode
	title: string
}) {
	return (
		<div className="flex flex-col w-full">
			<label className="text-sm text-slate-500 font-semibold">{title}</label>
			{children}
		</div>
	)
}
