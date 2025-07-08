"use client"
import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import React, { useEffect, useState } from "react"

const WelcomeToSetup = ({
	setRender,
}: {
	setRender: React.Dispatch<React.SetStateAction<React.ReactNode>>
}) => {
	return (
		<>
			<CardContent>
				<p>This is the setup page for the Coffee Board application.</p>
				<p>
					Please follow the instructions below to set up your Coffee Board
					account.
				</p>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button
					className="flex items-center gap-2"
					onClick={() => setRender(<CreateUser setRender={setRender} />)}
				>
					Continue
					<Icons.Misc.ArrowRight />
				</Button>
			</CardFooter>
		</>
	)
}

const CreateUser = ({
	setRender,
}: {
	setRender: React.Dispatch<React.ReactNode>
}) => {
	return (
		<>
			<CardContent>
				<p>Create a new user account.</p>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button
					className="flex items-center gap-2"
					onClick={() => setRender(<SetupComplete />)}
				>
					Continue
					<Icons.Misc.ArrowRight />
				</Button>
			</CardFooter>
		</>
	)
}

const SetupComplete = () => {
	return (
		<>
			<CardContent>
				<p>Setup complete! You can now access your Coffee Board account.</p>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button
					className="flex items-center gap-2"
					onClick={() => (window.location.href = "/login")}
				>
					Continue
					<Icons.Misc.ArrowRight />
				</Button>
			</CardFooter>
		</>
	)
}

export default function Client() {
	const [render, setRender] = useState<React.ReactNode | null>(null)

	useEffect(() => {
		setRender(<WelcomeToSetup setRender={setRender} />)
	}, [])

	return (
		<div className="flex-1 p-2 justify-center items-center flex flex-col">
			<Card className="w-1/2">
				<CardHeader>
					<CardTitle>Welcome to the Coffee Board Setup</CardTitle>
				</CardHeader>
				{render}
			</Card>
		</div>
	)
}
