create table settings (
	id serial primary key,
	id_user int,
	theme smallint default 1 not null,
	animations smallint default 1 not null,
	email_notifications smallint default 0 not null,
	foreign key (id_user)
		references users(id)
		on delete cascade
);