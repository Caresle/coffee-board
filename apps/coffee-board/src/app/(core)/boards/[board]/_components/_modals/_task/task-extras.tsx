import TaskChecklistSection from "./task-checklist-section"
import { useTaskStore } from "../../../_states/task.state"
import { CheckListTaskProvider } from "../../../_hook/use-checklist"
import AddCheckListButton from "./_checklist/add-checklist-button"
import { useChecklistStore } from "../../../_states/checklist.state"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import taskService from "@/services/task.service"
import { TaskCheckListHeader } from "@/entities/task.entity"

const NewChecklist = () => {
	const { item: task } = useTaskStore(state => state)
	const { isNew, item, update } = useChecklistStore(state => state)
	const mut = useMutation({
		mutationFn: (body: TaskCheckListHeader) =>
			taskService.addChecklistHeader(body),
		onSuccess: () => {
			update({ isNew: false, item: {} as TaskCheckListHeader })
		},
	})

	const onSubmit = () => {
		const body: TaskCheckListHeader = {
			id: 0,
			id_task: task.id,
			name: item.name,
		}
		mut.mutate(body)
	}

	const onBlur = () => {
		update({ isNew: false })
	}

	return (
		<div>
			{!isNew && <AddCheckListButton />}
			{isNew && (
				<Input
					id="new-checklist-input"
					disabled={mut.isPending}
					placeholder="Add a new checklist"
					onBlur={onBlur}
					onChange={e => update({ item: { ...item, name: e.target.value } })}
					value={item.name ?? ""}
					onKeyDown={e => {
						if (e.key === "Enter") {
							if (item.name.trim() === "") return
							onSubmit()
						}
					}}
				/>
			)}
		</div>
	)
}

/**
 * This component is used to display right now the multiple checklists that
 * a single task can have.
 */
export default function TaskExtras() {
	const { item } = useTaskStore(state => state)

	const checklist = item?.checklist || []

	if (checklist.length === 0) return <NewChecklist />

	return (
		<div className="flex flex-col gap-2">
			{checklist.map((check, index) => {
				return (
					<CheckListTaskProvider
						checklist={check}
						key={`checklist-${check.header?.id_task}-${check.header?.id}-${index}`}
					>
						<TaskChecklistSection />
					</CheckListTaskProvider>
				)
			})}
			<NewChecklist />
		</div>
	)
}
