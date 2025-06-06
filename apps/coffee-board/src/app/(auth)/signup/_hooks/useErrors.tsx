"use client"

import { useState } from "react"

export default function useErrors() {
	const initialErrors = {
		username: [] as Array<string>,
		email: [] as Array<string>,
		password: [] as Array<string>,
		confirmPassword: [] as Array<string>,
	}
	const [errors, setErrors] = useState(initialErrors)

	const resetErrors = () => {
		setErrors(initialErrors)
	}

	return {
		errors,
		setErrors,
		resetErrors,
	}
}
