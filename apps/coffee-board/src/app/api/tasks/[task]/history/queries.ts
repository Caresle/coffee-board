export const QueriesTaskHistory = {
	createTaskHistory: `
        insert into task_history (id_task, msg, id_user)
        values ($1, $2, $3)
    `,
}
