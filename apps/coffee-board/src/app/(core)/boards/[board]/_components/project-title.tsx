import { Button } from "@/components/ui/button"
import { FOCUS_IDS } from "@/constants/focus"
import { focusById } from "@/helpers/focusById"
import { Input } from "@/components/ui/input"
import { Project } from "@/entities/project.entity"
import { queryKeys } from "@/constants/queryKeys"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useViewSection } from "../_hook/use-view-section"
import Icons from "@/components/shared/icons"
import projectService from "@/services/project.service"
import TooltipBasic from "@/components/shared/tooltip-basic"

const RenamingProject = ({
	onSubmit,
	onChange,
	onBlur,
	name,
}: {
	onSubmit: (name: string) => void
	onChange: (name: string) => void
	onBlur: () => void
	name: string
}) => {
	return (
		<Input
			id={FOCUS_IDS.projectTitle}
			onChange={e => onChange(e.target.value)}
			value={name}
			placeholder="Project name"
			onKeyDown={e => {
				if (e.key === "Enter") {
					onSubmit(name)
				}
			}}
			onBlur={() => onBlur()}
		/>
	)
}

export default function ProjectTitle() {
	const { project } = useViewSection()
	const [isRenaming, setIsRenaming] = useState(false)
	const [name, setName] = useState(project.name)
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: projectService.update,
		onMutate: async (newProject: Project) => {
			const queryKey = [queryKeys.projects, { id: newProject.id }]
			await queryClient.cancelQueries({
				queryKey,
			})

			const previousData = queryClient.getQueryData<Project>(queryKey)

			await queryClient.setQueryData(queryKey, newProject)

			return { previousData }
		},
		onSuccess: () => {
			toast.info("Project updated successfully")
		},
		onError: (error, newProject, context) => {
			queryClient.setQueryData(
				[queryKeys.projects, { id: project.id }],
				context?.previousData,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.projects, { id: project.id }],
			})
		},
	})

	const onChange = (name: string) => {
		setName(name)
	}

	const onSubmit = () => {
		setIsRenaming(false)
		if (name.trim().length <= 0) {
			return
		}

		mut.mutate({ ...project, name })
	}

	const onClick = () => {
		setIsRenaming(true)
		focusById(FOCUS_IDS.projectTitle)
	}

	return (
		<div className="flex items-center gap-2">
			<Icons.Misc.Box className="size-5" />
			{isRenaming && (
				<RenamingProject
					onSubmit={onSubmit}
					onChange={onChange}
					name={name}
					onBlur={() => setIsRenaming(false)}
				/>
			)}
			{!isRenaming && (
				<>
					<h2 className="text-2xl font-bold">{project.name}</h2>
					<TooltipBasic title="Edit">
						<Button variant={"ghost"} onClick={onClick}>
							<Icons.Actions.Edit />
						</Button>
					</TooltipBasic>
				</>
			)}
		</div>
	)
}
