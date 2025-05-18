
-- View for the general information that the projects should display or have
-- no matter the visibility of it
create view v_cf_projects_base as (
	with projects_ds as (
		select
			p.*,
			u.username,
			u.email
		from projects p
		join users u on u.id = p.id_user
		order by id desc
	), boards_ds as (
		select
			b.id_project,
			json_agg(b.*) boards
		from boards b
		group by b.id_project
	)
	select
		p.*,
		b.boards
	from projects_ds p
	left join boards_ds b on b.id_project = p.id
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