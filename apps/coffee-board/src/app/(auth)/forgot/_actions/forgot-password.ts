"use server"

import { sendMail } from "@/lib/mail"

export async function forgotPassword(email: string) {
	try {
		await sendMail({
			from: "noreply@coffee-board.com",
			to: email,
			subject: "Reset your password",
			body: `<h1>Reset your password</h1>
            <p>Click the link below to reset your password.</p>
            <a href="http://localhost:3000/auth/reset-password?token=TOKEN">Reset password</a>
            <p>If you didn't request a password reset, you can ignore this email.</p>
            <p>Thanks,<br />The Coffee Board team</p>`,
		})
	} catch (error) {
		console.error(error)
		return { error }
	}
}
