"use client"
import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import PriorityModal from "./_components/_modals/priority-modal"
import { usePriorityStore } from "./_states/priority.state"
import PriorityDeleteModal from "./_components/_modals/priority-delete-modal"
import PriorityItem from "./_components/priority-item"

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

export default function Client() {
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<PriorityModal />
			<PriorityDeleteModal />

			<h1 className="text-2xl font-semibold">Priorities</h1>
			<div className="bg-slate-100 p-2 rounded-lg dark:bg-neutral-900">
				<CreatePriorityButton />
			</div>

			<div className="flex-1 rounded-lg p-2 border bg-slate-100 flex flex-col gap-2 overflow-y-auto dark:bg-neutral-900">
				{Array(10)
					.fill(0)
					.map((_, index) => (
						<PriorityItem key={index} />
					))}
			</div>
		</div>
	)
}
