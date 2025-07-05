import { AuthDatasource, SignUpUser } from "@/datasources/auth.datasource"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance } from "@/lib/axios"

class AuthService implements AuthDatasource {
	async login(username: string, password: string): Promise<string | null> {
		try {
			const axiosRes = await axiosInstance.post("/auth/", {
				username,
				password,
			})
			const res: ApiResponse = axiosRes.data

			return res.data
		} catch (error) {
			console.error(error)
			throw new Error("Error logging in")
		}
	}

	async signup(body: SignUpUser): Promise<string | null> {
		try {
			const res = await axiosInstance.post("/users/", body)
			console.log(res.data)
			return "true"
		} catch (error) {
			console.error(error)
			throw new Error("Error creating account")
		}
	}

	async logout(): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

const authService = new AuthService()
export default authService
