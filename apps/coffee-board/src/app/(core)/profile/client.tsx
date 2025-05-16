import FormItem from "@/components/shared/form-item"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import React from "react"

export default function Client() {
	return (
		<div className="flex-1 p-2">
			<h1 className="font-semibold text-2xl">Profile</h1>
			<Card>
				<CardHeader>
					<CardTitle>Username</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<FormItem title="Username">
						<Input placeholder="Username" />
					</FormItem>

					<FormItem title="Email">
						<Input placeholder="Email" type="email" />
					</FormItem>
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button>Save</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
