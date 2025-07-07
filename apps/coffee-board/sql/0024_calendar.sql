create type type_calendar as ENUM('MEETING', 'WORK', 'REMINDER', 'OTHER');

create table calendar_events (
	id serial primary key,
	id_project int not null,
	id_user int,
	name varchar(255),
	event_type type_calendar default 'OTHER',
	time_start time,
	time_end time,
	date_begin date,
	date_end date,
	deleted int not null default 0,
	foreign key (id_project)
		references projects(id)
		on delete no action,
	foreign key (id_user)
		references users(id)
		on delete no action
);