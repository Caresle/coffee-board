import { useEventPopoverStore } from "@/states/event-popover.state"
import { useRef } from "react"
import { useFloating, FloatingArrow, arrow } from "@floating-ui/react"
import { Button } from "@/components/ui/button"
import EventPopoverContent from "./event-popover-content"

export default function EventPopover() {
	const { show, update } = useEventPopoverStore(state => state)
	const arrowRef = useRef(null)
	const { floatingStyles, refs, context } = useFloating({
		open: show,
		placement: "right",
		middleware: [
			arrow({
				element: arrowRef,
			}),
		],
	})

	return (
		<div>
			<Button ref={refs.setReference} onClick={() => update({ show: !show })}>
				Click me
			</Button>
			{show && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					className="bg-white w-[400px] p-2 rounded-md border shadow dark:bg-neutral-900 dark:border-neutral-800"
				>
					<FloatingArrow
						ref={arrowRef}
						context={context}
						className="fill-white dark:fill-neutral-900"
					/>
					<EventPopoverContent />
				</div>
			)}
		</div>
	)
}
