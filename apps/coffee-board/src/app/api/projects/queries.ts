export const QueriesProject = {
	createProject: `
        insert into projects (name, description, id_user, visibility)
        values ($1, $2, $3, $4)
        returning *
    `,
	updateProject: `
        update projects
        set name = $1, description = $2, id_user = $3, visibility = $4
        where id = $5
        returning *
    `,
	deleteProjectSoft: `
        update projects
        set deleted = 1
        where id = $1
        returning *
    `,
	deleteProject: `
        delete from projects
        where id = $1
        returning *
    `,
}
