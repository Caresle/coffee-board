"use client"
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
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export default function SignUp() {
	const mut = useMutation({
		mutationFn: async () => {},
		onSuccess: () => {
			toast.success("Account created successfully")
			setTimeout(() => {
				window.location.href = "/"
			}, 400)
		},
	})

	const onSubmit = () => {
		mut.mutate()
	}

	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center dark:bg-neutral-900">
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
						<Button className="w-full" onClick={onSubmit}>
							Create Account
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
