import { io, Socket } from "socket.io-client"

let socket: Socket

export const getSocket = () => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
	}
	return socket
}
