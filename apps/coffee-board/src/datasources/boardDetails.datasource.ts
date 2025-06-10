import { BoardDetails } from "@/entities/board.entity"
import { GeneralDatasource } from "./general.datasource"

export interface BoardDetailsDatasource
	extends GeneralDatasource<BoardDetails> {}
