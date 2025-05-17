create table task_checklist (
	id serial primary key,
	id_task int not null,
	name varchar(255) not null,
	foreign key (id_task)
		references tasks(id)
		on delete cascade
);

create table task_checklist_det (
	id serial primary key,
	id_checklist int not null,
	name varchar(255) not null,
	completed smallint default 0 not null,
	level int default 1 not null,
	id_parent int,
	foreign key (id_checklist)
		references task_checklist(id)
		on delete cascade
);