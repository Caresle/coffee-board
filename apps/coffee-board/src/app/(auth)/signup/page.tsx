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
import GoBackButton from "../_components/go-back-button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { userValidator } from "@/validators/user.validator"
import authService from "@/services/auth.service"
import { SignUpUser } from "@/datasources/auth.datasource"
import useErrors from "./_hooks/useErrors"

export default function SignUp() {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	const { errors, setErrors, resetErrors } = useErrors()

	const mut = useMutation({
		mutationFn: (data: SignUpUser) => authService.signup(data),
		onSuccess: data => {
			if (!data) return
			toast.success("Account created successfully")
			setTimeout(() => {
				window.location.href = "/"
			}, 400)
		},
		onError: error => {
			console.error("Error creating account:", error)
			toast.error("Error creating account. Please try again.")
		},
	})

	const onSubmit = () => {
		const validated = userValidator.safeParse(form)

		if (!validated.success) {
			const errors = validated.error.flatten().fieldErrors
			setErrors({
				username: errors.username || [],
				email: errors.email || [],
				password: errors.password || [],
				confirmPassword: [],
			})
			return
		}

		if (form.password !== form.confirmPassword) {
			setErrors({
				...errors,
				confirmPassword: ["Passwords do not match"],
			})
			return
		}

		resetErrors()

		mut.mutate({
			username: form.username,
			email: form.email,
			password: form.password,
		})
	}

	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center dark:bg-neutral-900">
			<div className="lg:w-1/3 max-w-[400px]">
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
						<FormItem title="Username" errors={errors.username}>
							<Input
								placeholder="Username"
								value={form.username}
								onChange={e => setForm({ ...form, username: e.target.value })}
								autoFocus
								disabled={mut.isPending}
							/>
						</FormItem>

						<FormItem title="Email" errors={errors.email}>
							<Input
								placeholder="Email@email.com"
								type="email"
								value={form.email}
								onChange={e => setForm({ ...form, email: e.target.value })}
								disabled={mut.isPending}
							/>
						</FormItem>

						<FormItem title="Password" errors={errors.password}>
							<Input
								placeholder="Password"
								type="password"
								value={form.password}
								onChange={e => setForm({ ...form, password: e.target.value })}
								disabled={mut.isPending}
							/>
						</FormItem>

						<FormItem title="Confirm Password" errors={errors.confirmPassword}>
							<Input
								placeholder="Repeat Password"
								type="password"
								value={form.confirmPassword}
								onChange={e =>
									setForm({ ...form, confirmPassword: e.target.value })
								}
								disabled={mut.isPending}
							/>
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
