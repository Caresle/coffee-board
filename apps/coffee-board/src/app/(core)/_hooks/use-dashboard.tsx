"use client"

import { initialDashboardData } from "@/constants/dashboard-defaults"
import { DashboardData } from "@/entities/dashboard.entity"
import { createContext, useContext } from "react"

interface DashboardContext {
	data: DashboardData
}

const DashboardContext = createContext<DashboardContext>({
	data: initialDashboardData,
})

export function useDashboard() {
	return useContext(DashboardContext)
}

export function DashboardProvider({
	children,
	initialData,
}: {
	children: React.ReactNode
	initialData: DashboardData
}) {
	const value: DashboardContext = {
		data: initialData,
	}

	return <DashboardContext value={value}>{children}</DashboardContext>
}
