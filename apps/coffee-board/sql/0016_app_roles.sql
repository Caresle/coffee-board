create table app_role (
	id serial primary key,
	name varchar(255) not null,
	enabled bit default 1::bit
);

insert into app_role (name)
values ('admin'), ('regular');

select setval('app_role_id_seq', 2);