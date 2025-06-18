create table task_attachments (
	id serial primary key,
	id_task int not null,
	name varchar(255) not null,
	file_type varchar(20) not null,
	file_path varchar(255) not null,
	created_at timestamp default now() not null,
	foreign key (id_task)
		references tasks(id)
		on delete cascade
);