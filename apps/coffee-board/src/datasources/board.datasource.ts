import { Board } from "@/entities/board.entity"
import { GeneralDatasource } from "./general.datasource"

export interface BoardDatasource extends GeneralDatasource<Board> {}
