export const QueriesTaskHistory = {
	createTaskHistory: `
        insert into task_history (id_task, msg, id_user)
        values ($1, $2, $3)
    `,
	update: `
        update task_history
        set msg = $2
        where id = $1
        returning *
    `,
	delete: `
        delete from task_history
        where id = $1
        returning *
    `,
}
