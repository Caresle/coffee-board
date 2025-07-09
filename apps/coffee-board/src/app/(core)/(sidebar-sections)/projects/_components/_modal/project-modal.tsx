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
import Icons from "@/components/shared/icons"
import { useProjectStore } from "../../_states/project.state"
import FormItem from "@/components/shared/form-item"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import VisibilitySelector from "./visibility-selector"
import { projectValidator } from "@/validators/project.validator"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import projectService from "@/services/project.service"
import { Project } from "@/entities/project.entity"
import { toast } from "sonner"
import { useProjects } from "../../_hook/use-projects"
import { useMediaQuery } from "@/hooks/use-media-query"
import { mediaQueries } from "@/constants/media-query"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer"

const ProjectForm = ({
	mut,
}: {
	mut: UseMutationResult<Project | null, unknown, void, unknown>
}) => {
	const { update, item } = useProjectStore(state => state)

	return (
		<form className="flex flex-col gap-2">
			<FormItem title="Name">
				<Input
					disabled={mut.isPending}
					placeholder="Project name"
					required
					value={item.name ?? ""}
					onChange={e => update({ item: { ...item, name: e.target.value } })}
				/>
			</FormItem>
			<FormItem title="Description">
				<Textarea
					disabled={mut.isPending}
					placeholder="Write a description for your project"
					value={item.description ?? ""}
					onChange={e =>
						update({ item: { ...item, description: e.target.value } })
					}
				/>
			</FormItem>
			<VisibilitySelector />
		</form>
	)
}

export default function ProjectModal() {
	const { QProject } = useProjects()
	const { show, update, item, isEdit } = useProjectStore(state => state)
	const isDesktop = useMediaQuery(mediaQueries.desktop)

	const mut = useMutation({
		mutationFn: () => {
			if (isEdit) {
				return projectService.update(item)
			}
			return projectService.create(item)
		},
		onSuccess: () => {
			QProject.refetch()
			update({ show: false, item: {} as Project, isEdit: false })

			if (isEdit) {
				toast.success("Project updated successfully")
				return
			}
			toast.success("Project created successfully")
		},
	})

	const onSubmit = () => {
		const validated = projectValidator.safeParse(item)

		if (!validated.success) {
			const errors = validated.error.flatten().fieldErrors
			console.log(errors)
			return
		}

		mut.mutate()
	}

	if (!isDesktop) {
		return (
			<Drawer open={show} onOpenChange={value => update({ show: value })}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="flex items-center justify-center gap-2">
							<Icons.Misc.Books />
							Project
						</DrawerTitle>
						<DrawerDescription>
							Create or edit a project to manage your boards and tasks.
						</DrawerDescription>
					</DrawerHeader>
					<div className="px-2">
						<ProjectForm mut={mut} />
					</div>
					<DrawerFooter>
						<Button onClick={onSubmit} disabled={mut.isPending}>
							Save
						</Button>
						<DrawerClose asChild>
							<Button variant={"secondary"}>Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Icons.Misc.Books />
						Project
					</DialogTitle>
					<DialogDescription>
						Create or edit a project to manage your boards and tasks.
					</DialogDescription>
				</DialogHeader>
				<ProjectForm mut={mut} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button onClick={onSubmit} type="submit" disabled={mut.isPending}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
