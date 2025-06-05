export const QueriesTaskChecklist = {
	createCheckListHeader: `
        insert into task_checklist (id_task, name)
        values ($1, $2)
        returning *
    `,
	updateCheckListHeader: `
        update task_checklist
        set name = $2
        where id = $1
        returning *
    `,
	deleteCheckListHeader: `
        delete from task_checklist
        where id = $1
        returning *
    `,
}
