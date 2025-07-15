/*
Trigger function
Used to get the last task_order value and increment it by 1
for the new task created
*/
create or replace function tf_set_default_task_order()
returns trigger as $$
declare
	last_order int;
BEGIN
	select COALESCE(task_order, 0) into last_order from tasks
	where id_board_det = NEW.id_board_det
	order by task_order desc
	limit 1;

	NEW.task_order := last_order + 1;	

	return new;
END;
$$ language plpgsql;

-- Trigger creation
create trigger t_set_default_task_order
before insert on tasks
for each row
execute function tf_set_default_task_order();