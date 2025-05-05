"use client"
import FormItem from "@/components/shared/form-item"
import Icons from "@/components/shared/icons"
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
import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"

const GoBackButton = () => {
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
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center select-none">
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
