import { hashSync, compareSync } from "bcryptjs"

export const encrypt = (password: string) => {
	return hashSync(password, process.env.SALT ?? "salt")
}

export const compare = (password: string, hash: string) => {
	return compareSync(password, hash)
}
