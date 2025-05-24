import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Home() {
	return (
		<div className="flex-1 overflow-y-auto flex flex-col gap-2 p-2">
			<h1 className="text-2xl font-semibold">Welcome back</h1>
			<Separator />
			<div>
				<h2 className="font-semibold text-xl">Recent Projects</h2>
				<div className="bg-slate-50 flex-1 p-2 rounded-lg flex gap-2">
					<div className="w-1/3 bg-white rounded-lg p-2 border">1</div>
					<div className="w-1/3 bg-white rounded-lg p-2 border">2</div>
					<div className="w-1/3 bg-white rounded-lg p-2 border">3</div>
				</div>
			</div>
			<div className="flex gap-2 w-full flex-1 overflow-y-auto">
				<div className="w-1/2 bg-slate-50 flex-1 p-2 rounded-lg overflow-y-auto flex flex-col gap-2">
					<h2 className="font-semibold text-xl">Recent Tasks</h2>
					<div className="bg-white p-2 flex flex-col gap-2 overflow-y-auto flex-1 rounded-lg">
						{Array(10)
							.fill(0)
							.map((_, i) => (
								<div key={i} className="border p-2 rounded-lg">
									Task {i}
								</div>
							))}
					</div>
				</div>
				<div className="w-1/2 bg-slate-50 flex-1 p-2 rounded-lg overflow-y-auto flex flex-col gap-2">
					<h2 className="font-semibold text-xl">Recent Activity</h2>
					<div className="bg-white p-2 flex flex-col gap-2 overflow-y-auto flex-1 rounded-lg">
						{Array(10)
							.fill(0)
							.map((_, i) => (
								<div key={i} className="border p-2 rounded-lg">
									Task {i}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}
