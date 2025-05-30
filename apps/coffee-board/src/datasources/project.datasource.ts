import { Project } from "@/entities/project.entity"
import { GeneralDatasource } from "./general.datasource"

export interface ProjectDatasource extends GeneralDatasource<Project> {}
