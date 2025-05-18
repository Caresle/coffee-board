export const QueriesPriority = {
	createPriority: `
        insert into priorities (name, value)
        values ($1, $2)
        returning *
    `,
	updatePriority: `
        update priorities
        set name = $1, value = $2
        where id = $3
        returning *
    `,
	deletePriority: `
        delete from priorities
        where id = $1
        returning *
    `,
}
