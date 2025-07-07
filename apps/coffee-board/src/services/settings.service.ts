import { Settings } from "@/entities/settings.entity"
import { ApiResponse } from "@/helpers/api-response"
import { axiosInstance } from "@/lib/axios"
import { AxiosResponse } from "axios"

const BASE_ROUTE = "/settings"

class SettingsService {
	async getSettings(): Promise<Settings | null> {
		try {
			const response: AxiosResponse = await axiosInstance.get(BASE_ROUTE)
			const res = response.data as ApiResponse
			return res.data as Settings
		} catch (error) {
			console.error("Error fetching settings:", error)
			return null
		}
	}

	async updateSettings(settings: Settings) {
		try {
			await axiosInstance.post(BASE_ROUTE, settings)
			return settings
		} catch (error) {
			console.error("Error updating settings:", error)
			return null
		}
	}
}

const settingsService = new SettingsService()

export default settingsService
