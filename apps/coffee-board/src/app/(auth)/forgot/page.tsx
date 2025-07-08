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
import React, { useState } from "react"
import { toast } from "sonner"
import GoBackButton from "../_components/go-back-button"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "./_actions/forgot-password"

const SendResetLink = ({ email }: { email: string }) => {
	const mut = useMutation({
		mutationFn: forgotPassword,
		onSuccess: () => {
			toast.success("Email sent")
		},
	})

	const onSend = () => {
		if (!email) {
			toast.error("Email is required")
			return
		}

		mut.mutate(email)
	}

	return (
		<CardFooter className="flex justify-end">
			<Button onClick={onSend} disabled={mut.isPending}>
				Send Reset Link
			</Button>
		</CardFooter>
	)
}

export default function ForgotPage() {
	const [email, setEmail] = useState("")
	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center select-none dark:bg-neutral-900">
			<div className="lg:w-1/3 max-w-[400px]">
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
							<Input
								type="email"
								placeholder="Email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</FormItem>
					</CardContent>
					<SendResetLink email={email} />
				</Card>
			</div>
		</div>
	)
}
