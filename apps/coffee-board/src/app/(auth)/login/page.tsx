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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import React from "react"

const ForgotLink = () => {
	const router = useRouter()

	const goToForgotPassword = () => {
		router.push("/forgot")
	}

	return (
		<Button variant={"link"} onClick={goToForgotPassword}>
			Forgot Password?
		</Button>
	)
}

const CreateAccountLink = () => {
	const router = useRouter()

	const goToCreateAccount = () => {
		router.push("/signup")
	}

	return (
		<Button variant={"outline"} className="w-full" onClick={goToCreateAccount}>
			Create Account
		</Button>
	)
}

export default function LoginPage() {
	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center">
			<div className="w-1/4">
				<Card>
					<CardHeader>
						<CardTitle>Coffee Board</CardTitle>
						<CardDescription>
							Track your projects with this simple app
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col gap-2">
							<FormItem title="Username">
								<Input placeholder="Username" />
							</FormItem>

							<FormItem title="Password">
								<Input placeholder="Password" type="password" />
							</FormItem>
						</div>
						<div className="flex items-center justify-between select-none mt-2">
							<div className="flex gap-2 items-center select-none">
								<Checkbox id="remember" />
								<label htmlFor="remember">Remember me</label>
							</div>
							<ForgotLink />
						</div>
					</CardContent>
					<CardFooter className="flex justify-center gap-2 flex-col">
						<Button className="w-full">Login</Button>
						<CreateAccountLink />

						<Separator />
						<div className="flex gap-2">
							<Button variant={"outline"}>
								<Icons.Social.Github />
							</Button>
							<Button variant={"outline"}>
								<Icons.Social.Github />
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
