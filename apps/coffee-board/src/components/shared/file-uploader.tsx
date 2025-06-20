"use client"

import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Icons from "./icons"
import { cn } from "@/lib/utils"
import { useTaskStore } from "@/app/(core)/boards/[board]/_states/task.state"
import { useMutation } from "@tanstack/react-query"
import taskService from "@/services/task.service"

export default function FileUploader() {
	const { item } = useTaskStore()
	const mut = useMutation({
		mutationFn: ({ id_task, file }: { id_task: number; file: File }) =>
			taskService.uploadAttachment(id_task, file),
		onSuccess: () => {},
	})

	const onDrop = useCallback((acceptedFiles: File[]) => {
		for (const file of acceptedFiles) {
			mut.mutate({ id_task: item?.id, file })
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})
	return (
		<div
			{...getRootProps()}
			className={cn(
				"border-2 p-2 border-dashed rounded-lg min-h-[20vh] max-h-[25vh] flex flex-col items-center justify-center text-slate-400 font-semibold transition-all",
				{
					"border-blue-500 bg-blue-50 text-blue-500 dark:bg-blue-800/15":
						isDragActive,
				},
			)}
		>
			<input {...getInputProps()} />
			<Icons.Actions.File className="size-8" />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p className="text-center">
					Drag 'n' drop some files here, or click to select files
				</p>
			)}
		</div>
	)
}
