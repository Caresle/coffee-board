export const QueriesTaskChecklistItem = {
	createCheckListItem: `
		insert into task_checklist_det (id_checklist, name, completed, level, id_parent)
		values ($1, $2, $3, $4, $5)
		returning *
	`,
}
