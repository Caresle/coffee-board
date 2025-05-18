import React from "react"

export default function FormItem({
	children,
	title,
	errors,
}: {
	children: React.ReactNode
	title: string
	errors?: Array<string>
}) {
	return (
		<div className="flex flex-col w-full">
			<label className="text-sm text-slate-500 font-semibold">{title}</label>
			{children}

			<div>
				{errors && errors?.length > 0 && (
					<div className="text-sm text-red-500 font-semibold capitalize">
						{errors?.map((error, index) => (
							<div key={index}>{error}</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
