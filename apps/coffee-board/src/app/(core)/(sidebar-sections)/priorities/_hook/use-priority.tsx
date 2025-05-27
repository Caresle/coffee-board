"use client"

import { queryKeys } from "@/constants/queryKeys"
import { Priority } from "@/entities/priority.entity"
import priorityService from "@/services/priority.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext, useMemo } from "react"

interface PriorityContextProps {
	priorities: Priority[]
	QPriority: UseQueryResult<Priority[], void>
}

const PriorityContext = createContext<PriorityContextProps>({
	priorities: [],
	QPriority: {} as UseQueryResult<Priority[], void>,
})

export const usePriority = () => useContext(PriorityContext)

export const PriorityProvider = ({
	children,
	priorities: initialPriorities,
}: {
	children: React.ReactNode
	priorities: Priority[]
}) => {
	const QPriority = useQuery<Priority[], void>({
		queryKey: [queryKeys.priorities],
		queryFn: priorityService.getPriorities,
		initialData: initialPriorities,
	})

	const priorities = useMemo(() => QPriority?.data ?? [], [QPriority?.data])

	const value: PriorityContextProps = {
		QPriority,
		priorities,
	}

	return <PriorityContext value={value}>{children}</PriorityContext>
}
