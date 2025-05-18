-- Type used for the visibility of the project for others users
create type type_visibility as ENUM('public', 'private');

create table projects (
	id serial primary key,
	name varchar(255) not null,
	description text,
	id_user int not null,
	visibility type_visibility not null,
	deleted smallint default 0 not null,
	created_at timestamp default now() not null,
	foreign key (id_user)
		references users(id)
		on delete cascade
);
