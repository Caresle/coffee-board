export const CACHE_KEYS = {
	tags: "tags",
	projects: (id: number) => `projects-id_user-${id}`,
	priorities: "priorities",
}
