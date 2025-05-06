import FormItem from "@/components/shared/form-item"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import React from "react"
import GoBackButton from "../_components/go-back-button"

export default function SignUp() {
	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center">
			<div className="w-1/4">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<GoBackButton />
							Sign Up
						</CardTitle>
						<CardDescription>
							Create an account to start tracking your projects
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormItem title="Username">
							<Input placeholder="Username" />
						</FormItem>

						<FormItem title="Email">
							<Input placeholder="Email@email.com" type="email" />
						</FormItem>

						<FormItem title="Password">
							<Input placeholder="Password" type="password" />
						</FormItem>

						<FormItem title="Confirm Password">
							<Input placeholder="Repeat Password" type="password" />
						</FormItem>
					</CardContent>
					<CardFooter>
						<Button className="w-full">Create Account</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
