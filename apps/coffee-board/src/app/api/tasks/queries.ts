export const QueriesTask = {
	createTask: `
        insert into tasks (id_board_det, name, description, date_begin, date_end, id_priority, id_assigned, time_estimation)
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning *
    `,
}
