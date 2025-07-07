create or replace procedure p_updateSettings (
	p_id_user int,
	p_theme int,
	p_animation int,
	p_email_notifications int
)
language plpgsql
as $$
declare
	exists_record int = 0;
BEGIN
	exists_record := (
		SELECT COUNT(id) total from settings where id_user = p_id_user
	);

	if exists_record > 0 then
		update settings
		set theme = coalesce(p_theme, theme),
			animations = coalesce(p_animation, animations),
			email_notifications = coalesce(p_email_notifications, email_notifications)
		where id_user = p_id_user;
		return;
	end if;

	insert into settings(id_user, theme, animations, email_notifications)
	values (p_id_user, p_theme, p_animation, p_email_notifications);
end;
$$;