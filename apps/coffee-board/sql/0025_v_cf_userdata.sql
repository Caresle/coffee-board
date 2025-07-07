create or replace view v_cf_userdata as (
	select
		id,
		json_build_object(
			'id', id,
			'username', username
		) userdata
	from users
);
