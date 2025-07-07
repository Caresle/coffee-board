create or replace view v_cf_calendar_events as (
	select
		ce.*,
		u.userdata
	from calendar_events ce
	left join v_cf_userdata u on u.id = ce.id_user
)