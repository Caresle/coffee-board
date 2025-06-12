create view v_cf_tasks as (
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
	), task_checklist_header as (
		select
			tc.id,
			tc.id_task,
			row_to_json(tc.*) header
		from task_checklist tc 
	), task_checklist_details as (
		select
			tcd.id_checklist,
			json_agg(row_to_json(tcd.*)) details
		from task_checklist_det tcd
		group by tcd.id_checklist
	), tasks_checklist_ds as (
		select
			tch.id_task,
			json_agg(json_build_object(
				'header', tch.header,
				'details', tcd.details
			)) checklist
		from task_checklist_header tch
		left join task_checklist_details tcd on tcd.id_checklist = tch.id
		group by tch.id_task
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
		th.details history
	from tasks_header_ds h
	left join tasks_tags ta on ta.id_task = h.id
	left join tasks_checklist_ds tc on tc.id_task = h.id
	left join tasks_history_ds th on th.id_task = h.id
)
