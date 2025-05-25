create table boards (
	id serial primary key,
	id_project int not null,
	name varchar(255) not null,
	description varchar(255),
	deleted smallint default 0 not null,
	visibility type_visibility default 'private' not null,
	created_at timestamp default now() not null,
	foreign key (id_project)
		references projects(id)
		on delete cascade
);