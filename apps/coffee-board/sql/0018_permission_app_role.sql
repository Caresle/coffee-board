create table permissions_app_role (
	id serial primary key,
	id_app_role int,
	id_permission int,
	allowed bit default 1::bit,
	foreign key (id_app_role)
		references app_role(id)
		on delete no action,
	foreign key (id_permission)
		references permissions(id)
		on delete no action
)