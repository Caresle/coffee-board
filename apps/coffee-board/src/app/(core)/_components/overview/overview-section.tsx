import React from "react"
import OverviewSubCard from "./overview-sub-card"

export default function OverviewSection() {
	return (
		<div className="flex-1 overflow-y-auto gap-2 bg-slate-50 p-2 rounded-lg grid grid-cols-12 row-span-3">
			<div className="bg-white rounded-lg border p-2 col-span-12 row-span-1"></div>
			<div className="grid grid-cols-12 gap-2 col-span-12 row-span-2">
				<OverviewSubCard title="Recent Activity" />
				<OverviewSubCard title="Project Progress" />
			</div>
		</div>
	)
}
