export const QueriesTask = {
	createTask: `
        insert into tasks (id_board_det, name, description, date_begin, date_end, id_priority, id_assigned, time_estimation)
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning *
    `,
	updateTask: `
        update tasks
        set name = $2,
            description = $3,
            date_begin = $4,
            date_end = $5,
            id_priority = $6,
            id_assigned = $7,
            time_estimation = $8
        where id = $1
        returning *
    `,
	deleteTask: `
        delete from tasks
        where id = $1
        returning *
    `,
}
