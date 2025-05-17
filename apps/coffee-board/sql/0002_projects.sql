-- Type used for the visibility of the project for others users
create type type_visibility as ENUM('public', 'private');

create table projects (
	id serial primary key,
	name varchar(255) not null,
	description text,
	id_user int not null,
	visibility type_visibility not null,
	deleted smallint default 0 not null,
	created_at timestamp default now() not null,
	foreign key (id_user)
		references users(id)
		on delete cascade
);

-- View for the general information that the projects should display or have
-- no matter the visibility of it
create view v_cf_projects_base as (
	select
		p.*,
		u.username,
		u.email
	from projects p
	join users u on u.id = p.id_user
	order by id desc
);

create view v_cf_projects_public as (
	select
		*
	from v_cf_projects_base
	where
		deleted = 0
		and visibility = 'public'
);

create view v_cf_projects_private as (
	select
		*
	from v_cf_projects_base
	where
		deleted = 0
		and visibility = 'private'
);

-- View for the projects that are deleted
-- Here we need to filter for the `visibility` in case we want just show public or private ones
create view v_cf_projects_deleted as (
	select
		*
	from v_cf_projects_base
	where deleted = 0
);