create or replace function f_get_access(username varchar(255))
returns json as $$
BEGIN
	return (
		with user_access as (
			select
				u.id,
				u.username,
				u.app_role,
				a.enabled
			from users u
			left join app_role a on a.id = u.app_role
			where
				u.username = f_get_access.username
			limit 1
		), role_permissions as (
			select
				pa.*
			from permissions_app_role pa
			where pa.id_app_role = (select app_role from user_access)
		), user_permissions as (
			select
				pu.*
			from permissions_user pu
			where pu.id_user = (select id from user_access)
		), app_access_raw as (
			select
				coalesce(rp.id_permission, up.id_permission) id_permission,
				coalesce(up.allowed, rp.allowed) allowed
			from role_permissions rp
			full outer join user_permissions up on up.id_permission = rp.id_permission
		), app_access as (
			select
				p.*,
				a.allowed
			from permissions p
			join app_access_raw a on a.id_permission = p.id
		)
		select json_agg(row_to_json(a)) access from app_access a
	);
end;
$$ language plpgsql stable;