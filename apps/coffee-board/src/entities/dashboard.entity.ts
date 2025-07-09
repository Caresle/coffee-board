import { Project } from "./project.entity"
import { Task } from "./task.entity"

export interface DashboardData {
	recent_projects: Project[]
	recent_tasks: Task[]
	recent_activity: any[]
}
