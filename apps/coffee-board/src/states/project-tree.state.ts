import { Board } from "@/entities/board.entity"
import { createGeneralModalStore } from "./general-modal.state"

export const useTreeItemDeleteStore = createGeneralModalStore<Board>()
export const useTreeItemStore = createGeneralModalStore<Board>()
