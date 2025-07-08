"use client"
import { saveToken } from "@/actions/save-token"
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
import authService from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

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
	const router = useRouter()
	const [usernmae, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const mut = useMutation({
		mutationFn: () => authService.login(usernmae, password),
		onSuccess: async (token: string | null) => {
			if (!token) {
				toast.error("Invalid username or password")
				return
			}

			toast.success("Login Successful")
			await saveToken(token)

			setTimeout(() => {
				router.push("/")
			}, 500)
		},
		onError: error => {
			console.error("Error logging in:", error)
			toast.error("Error logging in. Please try again.")
		},
	})

	const onSubmit = () => {
		mut.mutate()
	}

	return (
		<div className="h-full p-2 bg-orange-50 flex flex-col items-center justify-center dark:bg-neutral-900">
			<div className="lg:w-1/3 max-w-[400px]">
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
								<Input
									placeholder="Username"
									value={usernmae}
									onChange={e => setUsername(e.target.value)}
								/>
							</FormItem>

							<FormItem title="Password">
								<Input
									placeholder="Password"
									type="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
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
						<Button
							className="w-full"
							onClick={onSubmit}
							disabled={mut.isPending}
						>
							Login
						</Button>
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
