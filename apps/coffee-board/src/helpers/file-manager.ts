import fs from "node:fs"
import path from "node:path"

const UPLOAD_FOLDER = path.join(process.env.FOLDER_DATA || "", "uploads")

class FileManager {
	constructor() {
		if (!fs.existsSync(UPLOAD_FOLDER)) {
			fs.mkdirSync(UPLOAD_FOLDER, { recursive: true })
		}
	}

	async uploadFile(file: File, taskId: number) {
		const fileBuffer = await file.arrayBuffer()

		fs.writeFileSync(
			path.join(UPLOAD_FOLDER, `${taskId}-${file.name}`),
			Buffer.from(fileBuffer),
		)

		return {
			path: path.join(UPLOAD_FOLDER, `${taskId}-${file.name}`),
			name: file.name,
			type: file.type,
			size: file.size,
		}
	}

	async removeFile(path: string) {
		if (!fs.existsSync(path)) return

		fs.unlinkSync(path)
	}

	async getFile(path: string) {
		if (!fs.existsSync(path)) return

		return fs.readFileSync(path)
	}
}

const fileManager = new FileManager()

export default fileManager
