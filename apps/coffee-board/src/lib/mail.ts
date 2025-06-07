import nodemailer from "nodemailer"

interface Mail {
	from: string
	to: string
	subject: string
	body: string
}

export const sendMail = async ({ from, to, subject, body }: Mail) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: false,
		})
		const result = await transporter.sendMail({
			from,
			to,
			subject,
			html: body,
		})

		return result
	} catch (error) {
		console.error(error)
		throw new Error("Error sending email")
	}
}
