import PrioritySelector from "./_meta_info/priority-selector"
import DatesSelector from "./_meta_info/dates-selector"
import TagSelector from "./_meta_info/tag-selector"
import AssignedToSelector from "./_meta_info/assigned-to-selector"

export default function MetaInfo() {
	return (
		<div className="grid grid-cols-2 gap-2 px-2">
			<div className="flex flex-col gap-2 col-span-1">
				<AssignedToSelector />
				<DatesSelector />
			</div>

			<div className="flex flex-col gap-2 col-span-1">
				<PrioritySelector />
				<TagSelector />
			</div>
		</div>
	)
}
