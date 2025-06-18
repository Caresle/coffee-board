import sharp from "sharp"

class FileConvert {
	async convertToWebp(file: File) {
		const fileBuffer = await file.arrayBuffer()
		const webpBuffer = await sharp(fileBuffer).webp({ quality: 80 }).toBuffer()
		return new File([webpBuffer], file.name, { type: "image/webp" })
	}
}

const fileConvert = new FileConvert()

export default fileConvert
