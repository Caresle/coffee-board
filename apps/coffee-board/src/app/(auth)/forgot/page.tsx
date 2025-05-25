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
import { toast } from "sonner"
import GoBackButton from "../_components/go-back-button"

const SendResetLink = () => {
	const onSend = () => {
		toast.success("Email sent")
	}

	return (
		<CardFooter className="flex justify-end">
			<Button onClick={onSend}>Send Reset Link</Button>
		</CardFooter>
	)
}

export default function ForgotPage() {
	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center select-none dark:bg-neutral-900">
			<div className="w-1/4">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<GoBackButton />
							Forgot Password
						</CardTitle>
						<CardDescription>
							Enter your email address and we will send you a link to reset your
							password
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormItem title="Email">
							<Input type="email" placeholder="Email" />
						</FormItem>
					</CardContent>
					<SendResetLink />
				</Card>
			</div>
		</div>
	)
}
