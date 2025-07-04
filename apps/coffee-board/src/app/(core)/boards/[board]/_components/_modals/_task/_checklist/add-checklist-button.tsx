import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { useChecklistStore } from "../../../../_states/checklist.state"

export default function AddCheckListButton() {
	const { update } = useChecklistStore.getState()

	const onClick = () => {
		update({ isNew: true })
		setTimeout(() => {
			const input = document.getElementById("new-checklist-input")
			if (input) {
				input.focus()
			}
		}, 100)
	}

	return (
		<div className="w-full">
			<Button
				variant={"secondary"}
				className="w-full flex justify-start items-center"
				onClick={onClick}
			>
				<Icons.Actions.Add />
				Add Checklist
			</Button>
		</div>
	)
}
