"use client"
import React from "react"
import {
	isServer,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

let browserQueryClient: QueryClient | undefined = undefined

const makeQueryClient = () => {
	return new QueryClient()
}

const getQueryClient = () => {
	if (isServer) return makeQueryClient()
	if (typeof window === "undefined") return makeQueryClient()
	if (!browserQueryClient) browserQueryClient = makeQueryClient()

	return browserQueryClient
}

export default function TanstackProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
