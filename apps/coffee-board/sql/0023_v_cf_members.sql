create or replace view v_cf_members as (
	with users_ds as (
		select
			id,
			username,
			app_role
		from users
	), members_ds as  (
		select
			m.*,
			0 id_board,
			row_to_json(u.*) userdata
		from members m
		join users_ds u on u.id = m.id_user
	), members_board_ds as (
		select
			mb.id,
			b.id_project,
			mb.id_user,
			mb.allowed,
			mb.id_board,
			row_to_json(u.*) userdata
		from members_board mb
		join users_ds u on u.id = mb.id_user
		join boards b on b.id = mb.id_board
	), combined as (
		select
			*
		from members_ds
		union all
		select * from members_board_ds
	)
	select * from combined
	order by id_project, id_user, id_board
);