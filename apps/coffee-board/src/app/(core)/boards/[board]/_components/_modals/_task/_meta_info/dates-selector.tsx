import Icons from "@/components/shared/icons"
import React, { useState } from "react"
import GeneralSelector from "../general-selector"
import { useTaskStore } from "../../../../_states/task.state"
import moment from "moment"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import FormItem from "@/components/shared/form-item"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"

const TimeStamps = ["Today", "Tomorrow", "Next Week", "2 Weeks", "4 Weeks"]

export default function DatesSelector() {
	const { item, update } = useTaskStore(state => state)
	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	})

	const beginDate = item.date_begin
		? moment(item.date_begin).format("YYYY-MM-DD")
		: ""
	const endDate = item.date_end
		? moment(item.date_end).format("YYYY-MM-DD")
		: ""

	const DateToDisplay = () => {
		if (beginDate && endDate && beginDate === endDate) {
			return `${beginDate}`
		}

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
			<Popover>
				<PopoverTrigger asChild>
					<Button className="w-full" variant={"ghost"}>
						<DateToDisplay />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-2 w-[500px] max-h-[400px]">
					<div>
						<div className="flex items-center gap-2">
							<FormItem title="Begin date">
								<Input
									type="date"
									placeholder="Select"
									onChange={() => {}}
									value={moment(date?.from ?? "").format("YYYY-MM-DD")}
								/>
							</FormItem>
							<FormItem title="End date">
								<Input
									type="date"
									placeholder="Select"
									onChange={() => {}}
									value={moment(date?.to ?? "").format("YYYY-MM-DD")}
								/>
							</FormItem>
						</div>
						<div className="grid grid-cols-12 gap-1 w-full mt-2">
							<div className="col-span-4 flex flex-col gap-2 overflow-y-auto border-r">
								{TimeStamps.map(time => (
									<Button
										key={time}
										variant={"ghost"}
										className="flex justify-start w-full px-2 py-1"
									>
										{time}
									</Button>
								))}
							</div>
							<div className="w-full col-span-8 flex items-center justify-center">
								<Calendar
									mode="range"
									selected={date}
									onSelect={range => {
										update({
											item: {
												...item,
												date_begin: range?.from ?? null,
												date_end: range?.to ?? null,
											},
										})
										setDate(range)
									}}
								/>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</GeneralSelector>
	)
}
