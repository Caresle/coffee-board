create table members (
	id serial primary key,
	id_project int not null,
	id_user int not null,
	allowed int default 1 not null,
	foreign key (id_project)
		references projects(id)
		on delete cascade,
	foreign key (id_user)
		references users(id)
		on delete no action
);

create table members_board (
	id serial primary key,
	id_board int not null,
	id_user int not null,
	allowed int default 1 not null,
	foreign key (id_board)
		references boards(id)
		on delete cascade,
	foreign key (id_user)
		references users(id)
		on delete no action
);