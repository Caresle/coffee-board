"use client"
import React from "react"
import TanstackProvider from "./tanstack-provider"
import { Toaster } from "sonner"
import { ThemeProvider } from "./theme-provider"
import { BoardProvider } from "@/hooks/use-board-global"

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
				<Toaster richColors expand closeButton position="top-right" />
				<TanstackProvider>
					<BoardProvider>{children}</BoardProvider>
				</TanstackProvider>
			</ThemeProvider>
		</>
	)
}
