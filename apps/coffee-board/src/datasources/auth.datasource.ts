export interface AuthDatasource {
	login(username: string, password: string): Promise<string | null>
	signup(body: SignUpUser): Promise<string | null>
	logout(): Promise<void>
}

export interface SignUpUser {
	username: string
	email: string
	password: string
}
