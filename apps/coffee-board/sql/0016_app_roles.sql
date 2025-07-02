create table app_role (
	id serial primary key,
	name varchar(255) not null,
	enabled bit
);