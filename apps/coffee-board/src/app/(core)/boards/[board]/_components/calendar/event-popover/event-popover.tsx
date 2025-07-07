import { useEventPopoverStore } from "@/states/event-popover.state"
import EventPopoverContent from "./event-popover-content"
import { useCalendar } from "../../../_hook/use-calendar"

export default function EventPopover() {
	const { show } = useEventPopoverStore(state => state)
	const { floating } = useCalendar()

	const { refs, floatingStyles } = floating

	return (
		<div>
			{show && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					className="bg-white w-[400px] p-2 rounded-md border shadow dark:bg-neutral-900 dark:border-neutral-800"
				>
					<EventPopoverContent />
				</div>
			)}
		</div>
	)
}
