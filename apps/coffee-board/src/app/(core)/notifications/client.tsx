"use client"
import React from "react"
import NotificationItem from "./_components/notification-item"

export default function Client() {
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<h2 className="text-2xl font-semibold">Notifications</h2>
			<div className="flex flex-col gap-2 bg-slate-100 flex-1 rounded-lg p-2 overflow-y-auto">
				<NotificationItem variant="error" />
				<NotificationItem variant="warning" />
				<NotificationItem variant="success" />
				<NotificationItem variant="info" />

				{Array(100)
					.fill(0)
					.map((_, index) => (
						<NotificationItem key={index} />
					))}
			</div>
		</div>
	)
}
