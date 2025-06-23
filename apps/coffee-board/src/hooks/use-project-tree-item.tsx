import { Board } from "@/entities/board.entity"
import { createContext, useContext, useState } from "react"

interface ProjectTreeItemContext {
	board: Board
	isRenaming?: boolean
	setIsRenaming: (isRenaming: boolean) => void
}

const ProjectTreeItemContext = createContext<ProjectTreeItemContext>({
	board: {} as Board,
	isRenaming: false,
	setIsRenaming: () => {},
})

export const useProjectTreeItem = () => {
	const context = useContext(ProjectTreeItemContext)

	return context
}

export const ProjectTreeItemProvider = ({
	children,
	board,
}: {
	children: React.ReactNode
	board: Board
}) => {
	const [isRenaming, setIsRenaming] = useState(false)

	const value: ProjectTreeItemContext = {
		board,
		isRenaming,
		setIsRenaming,
	}

	return (
		<ProjectTreeItemContext value={value}>{children}</ProjectTreeItemContext>
	)
}
