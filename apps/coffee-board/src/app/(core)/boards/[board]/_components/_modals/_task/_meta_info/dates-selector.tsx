import Icons from "@/components/shared/icons"
import React from "react"
import GeneralSelector from "../general-selector"
import { useTaskStore } from "../../../../_states/task.state"
import moment from "moment"

export default function DatesSelector() {
	const { item } = useTaskStore(state => state)

	const beginDate = item.date_begin
		? moment(item.date_begin).format("YYYY-MM-DD")
		: ""
	const endDate = item.date_end
		? moment(item.date_end).format("YYYY-MM-DD")
		: ""

	const DateToDisplay = () => {
		if (beginDate && endDate) {
			return `${beginDate} - ${endDate}`
		}
		if (beginDate) {
			return `${beginDate} - ...`
		}

		return "Select dates"
	}
	return (
		<GeneralSelector icon={<Icons.Misc.Calendar />} title="Dates">
			<DateToDisplay />
		</GeneralSelector>
	)
}
