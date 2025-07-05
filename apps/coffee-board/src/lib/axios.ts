import axios from "axios"

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
		"X-Client-Type": "web",
	},
	withCredentials: true,
})

const instanceFormData = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "multipart/form-data",
		"X-Client-Type": "web",
	},
	withCredentials: true,
})

// TODO: Remove this when the auth in the mobile app is done
// ? we are sending the token in the cookies for the web app
// ? and in the headers for the mobile app
// export const tokenInterceptor = instance.interceptors.request.use(
// 	function (config) {
// 		const token = window.localStorage.getItem("token")

// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`
// 		}

// 		return config
// 	},
// 	function (error) {
// 		return Promise.reject(error)
// 	},
// )

export const responseInterceptor = instance.interceptors.response.use(
	response => response,
	error => {
		const originalRequest = error.config?.url
		if (error?.response?.status === 401 && originalRequest !== "/login") {
			window.location.href = "/login"
		}
		return Promise.reject(error)
	},
)

export const axiosInstance = instance
export const axiosInstanceFormData = instanceFormData
