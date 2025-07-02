create type type_action as ENUM('GET', 'POST', 'PUT', 'DELETE');

create table permissions (
	id serial primary key,
	name varchar(255) not null,
	action_type type_action
);