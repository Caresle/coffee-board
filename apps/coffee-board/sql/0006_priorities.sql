create table priorities (
	id serial primary key,
	name varchar(50) not null,
	value float default 1 not null,
	created_at timestamp default now() not null
);