import type { Metadata } from "next"
import "./globals.css"
import Providers from "@/providers/providers"

export const metadata: Metadata = {
	title: "Coffee Board",
	description: "Track your projects with this simple app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="transition-all h-screen w-full p-0">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
