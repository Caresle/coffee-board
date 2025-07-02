create table permissions_user (
	id serial primary key,
	id_permission int,
	id_user int,
	allowed bit default 1::bit,
	foreign key (id_permission)
		references permissions(id)
		on delete no action,
	foreign key (id_user)
		references users(id)
		on delete no action
)