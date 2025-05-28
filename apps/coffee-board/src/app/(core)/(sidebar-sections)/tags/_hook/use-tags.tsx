"use client"

import { queryKeys } from "@/constants/queryKeys"
import { Tag } from "@/entities/tag.entity"
import tagService from "@/services/tag.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext, useMemo } from "react"

interface TagContextProps {
	QTags: UseQueryResult<Tag[], void>
	tags: Tag[]
}

const TagContext = createContext<TagContextProps>({
	QTags: {} as UseQueryResult<Tag[], void>,
	tags: [],
})

export const useTags = () => useContext(TagContext)

export const TagProvider = ({
	children,
	tags: initialTags,
}: {
	children: React.ReactNode
	tags: Tag[]
}) => {
	const QTags = useQuery<Tag[], void>({
		queryKey: [queryKeys.tags],
		queryFn: () => tagService.getTags(),
		initialData: initialTags,
	})

	const tags = useMemo(() => QTags?.data ?? [], [QTags?.data])

	const value: TagContextProps = {
		QTags,
		tags,
	}

	return <TagContext value={value}>{children}</TagContext>
}
