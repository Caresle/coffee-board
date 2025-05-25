export const QueriesBoard = {
	createBoard: `
        insert into boards (id_project, name, description, visibility)
        values ($1, $2, $3, $4)
        returning *
    `,
	updateBoard: `
        update boards
        set name = $1, description = $2, visibility = $3
        where id = $4
        returning *
    `,
	deleteBoardSoft: `
        update boards
        set deleted = 1
        where id = $1
        returning *
    `,
	deleteBoard: `
        delete from boards
        where id = $1
        returning *
    `,
}
