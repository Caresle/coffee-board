"use client"
import React from "react"
import TanstackProvider from "./tanstack-provider"
import { Toaster } from "sonner"

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster richColors expand closeButton position="top-right" />
			<TanstackProvider>{children}</TanstackProvider>
		</>
	)
}
