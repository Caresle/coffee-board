import Client from "./client"

export default async function BoardPage({
	params,
}: {
	params: Promise<{ board: string }>
}) {
	const { board } = await params
	console.log(board)
	return <Client />
}
