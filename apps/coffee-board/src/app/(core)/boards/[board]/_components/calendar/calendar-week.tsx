import { cn } from "@/lib/utils"
import moment from "moment"
import React from "react"

export default function CalendarWeek() {
	const iterableDate = moment().startOf("week").subtract(1, "day")
	const currDay = moment().format("D")

	return (
		<div className="grid grid-cols-12">
			<div className="border-b col-span-1"></div>
			<div className="col-span-11 grid grid-cols-7">
				{Array(7)
					.fill(0)
					.map((_, i) => {
						const day = iterableDate.add(1, "day")
						return (
							<div
								key={i}
								className="font-semibold flex flex-col items-center justify-center border-b border-r"
							>
								<h2>{day.format("dddd")}</h2>
								<div
									className={cn({
										"dark:bg-blue-500 bg-blue-600 text-white font-semibold size-5 flex items-center justify-center p-2 rounded-sm":
											currDay === day.format("D"),
									})}
								>
									{day.format("D")}
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}
