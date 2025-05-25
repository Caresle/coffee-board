export const QueriesUsers = {
	createUser: `
        insert into users (username, email, password, first_name, last_name, app_role)
        values ($1, $2, $3, $4, $5, 'user')
        returning *
    `,
	updateUser: `
        update users
        set username = $1, email = $2, password = COALESCE($3, password), first_name = $4, last_name = $5
        where id = $6
        returning *
    `,
	deleteUser: `
        delete from users
        where id = $1
        returning *
    `,
}
