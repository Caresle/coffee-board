import { Separator } from "@/components/ui/separator"
import React from "react"
import Icons from "../icons"
import { usePathname } from "next/navigation"

export default function ProjectTree() {
	const pathName = usePathname()

	if (!pathName.includes("/boards/")) return <></>

	return (
		<div className="p-1">
			<Separator />
			<ul>
				<li className="flex items-center gap-2 p-2">
					<Icons.Misc.Folder className="size-5" />
					Projects Name
				</li>
				<li className="flex items-center gap-2 p-1">
					<div className="size-5 flex justify-center">
						<div className="w-[1px] h-5 border border-slate-400 dark:border-neutral-700"></div>
					</div>
					<div className="flex items-center gap-2 p-2 transiton-all hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-lg cursor-pointer w-full">
						<Icons.Misc.File className="size-5" />
						Board 1
					</div>
				</li>
			</ul>
		</div>
	)
}
