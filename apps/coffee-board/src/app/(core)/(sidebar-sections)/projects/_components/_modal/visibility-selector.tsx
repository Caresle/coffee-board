import Combobox from "@/components/shared/combobox"
import FormItem from "@/components/shared/form-item"
import { useCombobox } from "@/hooks/use-combobox"
import { UseQueryResult } from "@tanstack/react-query"
import React from "react"
import { useProjectStore } from "../../_states/project.state"

export default function VisibilitySelector() {
	const { update, item } = useProjectStore(state => state)

	return (
		<FormItem title="Visibility">
			<Combobox
				combobox={{
					value: { name: item.visibility, id: item.visibility },
					set: value =>
						update({
							item: { ...item, visibility: value.id as "public" | "private" },
						}),
					reset: () => update({ item: { ...item, visibility: "public" } }),
					clear: () => update({ item: { ...item, visibility: "public" } }),
				}}
				label="id"
				Query={
					{
						data: [
							{ id: "public", name: "Public" },
							{ id: "private", name: "Private" },
						],
					} as UseQueryResult<{ id: string; name: string }[]>
				}
			/>
		</FormItem>
	)
}
