import { hashSync, compareSync } from "bcryptjs"

export const encrypt = (password: string) => {
	return hashSync(password, Number(process.env.SALT))
}

export const compare = (password: string, hash: string) => {
	return compareSync(password, hash)
}
