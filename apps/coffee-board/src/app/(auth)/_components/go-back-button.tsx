"use client"
import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"

export default function GoBackButton() {
	const router = useRouter()
	const goBack = () => {
		router.push("/login")
	}
	return (
		<Button variant="ghost" onClick={goBack}>
			<Icons.Actions.Back />
		</Button>
	)
}
