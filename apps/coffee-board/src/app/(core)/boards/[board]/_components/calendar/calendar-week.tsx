import React from "react"

export default function CalendarWeek() {
	return (
		<div className="grid grid-cols-8">
			<div className="border-b"></div>
			{Array(7)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className="font-semibold flex flex-col items-center justify-center border-b border-r"
					>
						<h2>Sun</h2>
						<div>{i}</div>
					</div>
				))}
		</div>
	)
}
