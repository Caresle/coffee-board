"use client"
import { Separator } from "@/components/ui/separator"
import { DashboardData } from "@/entities/dashboard.entity"
import React from "react"
import { DashboardProvider } from "./_hooks/use-dashboard"
import RecentProjects from "./_components/recent-projects"
import RecentTasks from "./_components/recent-tasks"
import RecentActivity from "./_components/recent-activity"

export default function Client({
	initialData,
}: {
	initialData: DashboardData
}) {
	return (
		<DashboardProvider initialData={initialData}>
			<div className="flex-1 overflow-y-auto flex flex-col gap-2 p-2">
				<h1 className="text-2xl font-semibold">Welcome back</h1>
				<Separator />
				<RecentProjects />
				<div className="flex gap-2 w-full flex-1 overflow-y-auto">
					<RecentTasks />
					<RecentActivity />
				</div>
			</div>
		</DashboardProvider>
	)
}
