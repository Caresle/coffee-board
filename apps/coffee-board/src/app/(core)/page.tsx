import getDashboardData from "@/actions/dashboard/get-dashboard-data"
import Client from "./client"

export default async function Home() {
	const data = await getDashboardData()
	return <Client initialData={data} />
}
