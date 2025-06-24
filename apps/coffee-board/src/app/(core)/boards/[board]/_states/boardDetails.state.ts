import { BoardDetails } from "@/entities/board.entity"
import { createGeneralModalStore } from "@/states/general-modal.state"

export const useDetailArchiveStore = createGeneralModalStore<BoardDetails>()
export const useDetailDeleteStore = createGeneralModalStore<BoardDetails>()
