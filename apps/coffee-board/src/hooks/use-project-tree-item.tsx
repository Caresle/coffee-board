import { Board } from "@/entities/board.entity"
import { createContext, useContext } from "react"

interface ProjectTreeItemContext {
	board: Board
}

const ProjectTreeItemContext = createContext<ProjectTreeItemContext>({
	board: {} as Board,
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
	const value: ProjectTreeItemContext = {
		board,
	}
	return (
		<ProjectTreeItemContext value={value}>{children}</ProjectTreeItemContext>
	)
}
