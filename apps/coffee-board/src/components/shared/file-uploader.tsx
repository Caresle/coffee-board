"use client"

import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Icons from "./icons"
import { cn } from "@/lib/utils"

export default function FileUploader() {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log(acceptedFiles)
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
