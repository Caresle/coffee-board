import React from "react"
import { Button } from "../ui/button"
import ShareModal from "./share-modal"
import { useShareStore } from "@/states/share.state"

export default function ShareButton() {
	const { update } = useShareStore(state => state)

	return (
		<>
			<ShareModal />
			<Button variant={"outline"} onClick={() => update({ show: true })}>
				Share
			</Button>
		</>
	)
}
