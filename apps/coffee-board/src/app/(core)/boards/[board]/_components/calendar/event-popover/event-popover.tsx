import { useEventPopoverStore } from "@/states/event-popover.state"
import React from "react"

export default function EventPopover() {
	const { show, update } = useEventPopoverStore(state => state)
	return <></>
}
