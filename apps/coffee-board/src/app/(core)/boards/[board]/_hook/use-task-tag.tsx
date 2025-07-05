"use client"

import { Tag } from "@/entities/tag.entity"
import { useQueryClient } from "@tanstack/react-query"
import { useTaskStore } from "../_states/task.state"
import { Task } from "@/entities/task.entity"
import { queryKeys } from "@/constants/queryKeys"

export default function useTaskTag() {
	const queryClient = useQueryClient()
	const { item, update } = useTaskStore(state => state)

	const addTagToTask = (tag: Tag) => {
		const { id_board_det, id, tags: tagsTask } = item

		const newTags = [...(tagsTask ?? []), tag]

		const tasks = queryClient.getQueryData<Task[]>([
			queryKeys.tasks,
			{
				id: id_board_det,
			},
		])

		const newTasks = tasks?.map(task => {
			if (task.id === id) {
				const newTask = {
					...task,
					tags: newTags,
				}
				update({ item: newTask })
				return newTask
			}
			return task
		})

		queryClient.setQueryData([queryKeys.tasks, { id: id_board_det }], newTasks)
	}

	const removeTagFromTask = (tag: Tag) => {
		const { id_board_det, id, tags: tagsTask } = item

		const newTags = tagsTask?.filter(t => t.id !== tag.id)

		const tasks = queryClient.getQueryData<Task[]>([
			queryKeys.tasks,
			{
				id: id_board_det,
			},
		])

		const newTasks = tasks?.map(task => {
			if (task.id === id) {
				const newTask = {
					...task,
					tags: newTags,
				}
				update({ item: newTask })
				return newTask
			}
			return task
		})

		queryClient.setQueryData([queryKeys.tasks, { id: id_board_det }], newTasks)
	}

	return {
		addTagToTask,
		removeTagFromTask,
	}
}
