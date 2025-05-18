export const QueriesTag = {
	createTag: `
        insert into tags (name, color)
        values ($1, $2)
        returning *
    `,
	updateTag: `
        update tags
        set name = $1, color = $2
        where id = $3
        returning *
    `,
	deleteTag: `
        delete from tags
        where id = $1
        returning *
    `,
}
