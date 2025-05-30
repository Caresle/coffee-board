import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import { useViewSection, VIEW_SECTION } from "../_hook/use-view-section"
import Combobox from "@/components/shared/combobox"
import { UseQueryResult } from "@tanstack/react-query"
import { Board } from "@/entities/board.entity"

export default function FilterDisplaySection() {
	const { section, setSection, boards, boardSelected } = useViewSection()

	const changeSection = (section: string) => {
		setSection(section)
	}

	return (
		<div className="flex items-end gap-1">
			<Button
				className="flex items-center gap-2"
				variant={
					section === VIEW_SECTION.OVERVIEW
						? "underline-active"
						: "underline-hidden"
				}
				onClick={() => changeSection(VIEW_SECTION.OVERVIEW)}
			>
				<Icons.Actions.File />
				Overview
			</Button>

			<Button
				className="flex items-center gap-2"
				variant={
					section === VIEW_SECTION.BOARD
						? "underline-active"
						: "underline-hidden"
				}
				onClick={() => changeSection(VIEW_SECTION.BOARD)}
			>
				<Icons.Misc.Dashboard />
				Board
			</Button>

			<Button
				className="flex items-center gap-2"
				variant={
					section === VIEW_SECTION.CALENDAR
						? "underline-active"
						: "underline-hidden"
				}
				onClick={() => changeSection(VIEW_SECTION.CALENDAR)}
			>
				<Icons.Misc.Calendar />
				Calendar
			</Button>

			<Combobox
				combobox={boardSelected}
				label="name"
				Query={
					{
						data: boards,
					} as UseQueryResult<Board[]>
				}
			/>
		</div>
	)
}
