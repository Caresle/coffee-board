import * as jose from "jose"

export async function signToken(
	payload: Record<string, any>,
	expiresIn: string = "24h",
): Promise<string> {
	const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
	const jwt = await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(expiresIn)
		.sign(secretKey)
	return jwt
}

export async function verifyToken(token: string): Promise<object | null> {
	try {
		const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jose.jwtVerify(token, secretKey)
		return payload
	} catch (error) {
		console.error("Token verification failed:", error)
		return null
	}
}
