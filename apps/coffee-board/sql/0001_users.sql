create table users (
    id serial primary key,
    username varchar(255) not null unique,
	first_name varchar(255),
	last_name varchar(255),
    email varchar(255),
    password varchar(255),
    app_role int
);