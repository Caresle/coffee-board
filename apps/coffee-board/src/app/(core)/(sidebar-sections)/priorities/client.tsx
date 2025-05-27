"use client"
import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import PriorityModal from "./_components/_modals/priority-modal"
import { usePriorityStore } from "./_states/priority.state"
import PriorityDeleteModal from "./_components/_modals/priority-delete-modal"
import { Priority } from "@/entities/priority.entity"
import { PriorityProvider } from "./_hook/use-priority"
import PriorityList from "./_components/priority-list"

const CreatePriorityButton = () => {
	const { update } = usePriorityStore(state => state)
	return (
		<div>
			<Button onClick={() => update({ show: true, isEdit: false })}>
				<Icons.Actions.Add />
				Create Priority
			</Button>
		</div>
	)
}

export default function Client({
	initialPriorities = [],
}: {
	initialPriorities: Priority[]
}) {
	return (
		<PriorityProvider priorities={initialPriorities}>
			<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
				<PriorityModal />
				<PriorityDeleteModal />

				<h1 className="text-2xl font-semibold">Priorities</h1>
				<div className="bg-slate-100 p-2 rounded-lg dark:bg-neutral-900">
					<CreatePriorityButton />
				</div>
				<PriorityList />
			</div>
		</PriorityProvider>
	)
}
