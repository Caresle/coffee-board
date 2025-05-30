import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import Icons from "@/components/shared/icons"
import { useDeleteProjectStore } from "../../_states/delete-project.state"
import { useMutation } from "@tanstack/react-query"
import projectService from "@/services/project.service"
import { Project } from "@/entities/project.entity"
import { toast } from "sonner"
import { useProjects } from "../../_hook/use-projects"

export default function DeleteProjectModal() {
	const { QProject } = useProjects()
	const { show, update, item } = useDeleteProjectStore(state => state)

	const mut = useMutation({
		mutationFn: projectService.delete,
		onSuccess: () => {
			QProject.refetch()
			toast.success("Project deleted successfully")
			update({ show: false, item: {} as Project })
		},
	})

	const onSubmit = () => {
		mut.mutate(item.id)
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center text-red-500">
						<Icons.Misc.Books />
						Delete Project
					</DialogTitle>
					<DialogDescription>
						This action will delete the project
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button
						onClick={onSubmit}
						variant={"destructive"}
						disabled={mut.isPending}
					>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
