export const focusById = (id: string) => {
	setTimeout(() => {
		const element = document.getElementById(id)
		if (element) {
			element.focus()
		}
	}, 100)
}
