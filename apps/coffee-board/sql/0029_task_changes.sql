/*
Missing task_order column for the sorting of tasks
in the ui
*/

alter table tasks
add column task_order int not null default 0;

-- Updating the task_order column
update tasks
set task_order = new_order.idr
from (
	select
		id,
		id_board_det,
		task_order,
		row_number() over (partition by id_board_det order by id) idr
	from tasks
) as new_order
where tasks.id = new_order.id;

-- Updating the v_cf_tasks view to order by task_order column
drop view v_cf_tasks;

create or replace view v_cf_tasks as (
	with tasks_header_ds as (
		select
			t.*,
			case
				when p.* is not null then
					json_build_object(
						'id', p.id,
						'name', p.name,
						'value', p.value
					)
				else null
			end priority
		from tasks t
		left join priorities p on p.id = t.id_priority
	), tasks_tags as (
		select
			th.id id_task,
			json_agg(json_build_object (
				'id', t.id,
				'name', t.name,
				'color', t.color
			)) tags
		from tasks_header_ds th
		join task_tags tt on tt.id_task = th.id
		join tags t on t.id = tt.id_tag
		group by th.id
	), tasks_history_ds as (
		select
			h.id_task,
			json_agg(json_build_object(
				'message', row_to_json(h.*),
				'user', json_build_object(
					'id', u.id,
					'username', u.username,
					'first_name', u.first_name,
					'last_name', u.last_name
				)
			)) details
		from task_history h
		join tasks_header_ds th on th.id = h.id_task
		left join users u on u.id = h.id_user
		group by h.id_task
	)
	select
		h.*,
		ta.tags,
		tc.checklist,
		th.details history,
		tca.attachments
	from tasks_header_ds h
	left join tasks_tags ta on ta.id_task = h.id
	left join v_cf_tasks_checklist tc on tc.id_task = h.id
	left join tasks_history_ds th on th.id_task = h.id
	left join v_cf_tasks_attachments tca on tca.id_task = h.id
	order by h.task_order asc
);