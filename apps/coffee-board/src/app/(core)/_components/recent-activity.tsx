import React from "react"
import { useDashboard } from "../_hooks/use-dashboard"
import Icons from "@/components/shared/icons"

const RecentActivityCard = () => {
	return <div className="border p-2 rounded-lg">Activity</div>
}

const NoActivityFound = () => {
	return (
		<div className="w-full flex flex-col items-center gap-1 text-slate-500 dark:text-neutral-400 font-semibold flex-1 justify-center">
			<Icons.Misc.Books className="size-12" />
			<div>No activity found</div>
		</div>
	)
}

export default function RecentActivity() {
	const { data } = useDashboard()
	return (
		<div className="w-1/2 bg-slate-50 flex-1 p-2 rounded-lg overflow-y-auto flex flex-col gap-2 dark:bg-neutral-900">
			<h2 className="font-semibold text-xl">Recent Activity</h2>
			<div className="bg-white p-2 flex flex-col gap-2 overflow-y-auto flex-1 rounded-lg dark:bg-neutral-800">
				{(data.recent_activity.length === 0 || !data.recent_activity) && (
					<NoActivityFound />
				)}
				{data.recent_activity.length > 0 &&
					data.recent_activity.map(activity => (
						<RecentActivityCard key={activity.id} />
					))}
			</div>
		</div>
	)
}
