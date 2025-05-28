import FormItem from "@/components/shared/form-item"
import { Input } from "@/components/ui/input"
import React, { useEffect } from "react"
import { useTagStore } from "../_states/tag.state"

export default function ColorSelector({
	disabled = false,
}: {
	disabled?: boolean
}) {
	const [color, setColor] = React.useState("")
	const { update } = useTagStore.getState()

	useEffect(() => {
		const show = useTagStore.getState().show

		if (!show) return

		const timeout = setTimeout(() => {
			const item = useTagStore.getState().item

			update({ item: { ...item, color: color } })
		}, 300)

		return () => clearTimeout(timeout)
	}, [color])

	return (
		<FormItem title="Color">
			<Input
				placeholder="Color"
				type="color"
				value={color}
				onChange={e => setColor(e.target.value)}
				disabled={disabled}
			/>
		</FormItem>
	)
}
