export const QueriesCalendar = {
	createEvent: `
        insert into calendar_events (id_project, id_user, name, event_type, time_start, time_end, date_begin, date_end)
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning *;
    `,
	updateEvent: `
        update calendar_events
        set name = $2, event_type = $3, time_start = $4, time_end = $5, date_begin = $6, date_end = $7
        where id = $1
        returning *;
    `,
	deleteEventSoft: `
        update calendar_events
        set deleted = 1
        where id = $1
        returning *;
    `,
}
