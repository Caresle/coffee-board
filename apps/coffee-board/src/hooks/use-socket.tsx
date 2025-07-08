"use client"

import { getSocket } from "@/lib/socket"
import { useEffect, useRef } from "react"
import { Socket } from "socket.io-client"

interface Handlers {
	[event: string]: any
}

export const useSocket = (handler: Handlers) => {
	const socketRef = useRef<Socket>(null)

	useEffect(() => {
		const socket = getSocket()
		socketRef.current = socket

		socket.on("connect", () => console.log("socket connected"))
		socket.on("disconnect", () => console.log("socket disconnected"))

		// * Binding of the events
		Object.entries(handler).forEach(([event, callback]) => {
			socket.on(event, callback)
		})

		return () => {
			Object.entries(handler).forEach(([event, callback]) => {
				socket.off(event, callback)
			})
		}
	}, [])

	return {
		socket: socketRef.current,
		emit: (event: string, payload: any) => {
			socketRef.current?.emit(event, payload)
		},
	}
}
