create table task_history (
	id serial primary key,
	id_task int not null,
	msg varchar(255) not null,
	stamp timestamp default now() not null,
	id_user int not null,
	foreign key (id_task)
		references tasks(id)
		on delete cascade,
	foreign key (id_user)
		references users(id)
		on delete no action
);