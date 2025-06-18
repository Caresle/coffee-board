export const QueriesAttachment = {
	create: `
        insert into task_attachments (id_task, name, file_type, file_path)
        values ($1, $2, $3, $4)
        returning *
    `,
}
