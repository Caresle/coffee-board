import moment from "moment"
import React from "react"

export default function CalendarWeek() {
	const iterableDate = moment().startOf("week").subtract(1, "day")

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
								<div>{day.format("D")}</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}
