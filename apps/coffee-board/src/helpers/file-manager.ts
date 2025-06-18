import fs from "node:fs"
import path from "node:path"
import fileConvert from "./file-convert"

const UPLOAD_FOLDER = path.join(process.env.FOLDER_DATA || "", "uploads")

class FileManager {
	constructor() {
		if (!fs.existsSync(UPLOAD_FOLDER)) {
			fs.mkdirSync(UPLOAD_FOLDER, { recursive: true })
		}
	}

	async uploadFile(file: File, taskId: number) {
		let fileBuffer = await file.arrayBuffer()
		const filePath = path.join(UPLOAD_FOLDER, `${taskId}`)
		let fileName = `${taskId}-${file.name}`

		if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true })

		if (file.type.includes("image")) {
			const fileWebp = await fileConvert.convertToWebp(file)
			fileBuffer = await fileWebp.arrayBuffer()
			fileName = `${taskId}-${file.name.replace(/\.[^/.]+$/, "")}.webp`
		}

		fs.writeFileSync(path.join(filePath, fileName), Buffer.from(fileBuffer))

		return {
			path: path.join(filePath, fileName),
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
