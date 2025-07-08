create or replace function f_get_progress_project(p_id_project int)
returns table (
	id int,
	board_data json,
	details_data json
) as $$
begin
	return query
	with boards_ds as (
		select
			*
		from v_cf_boards
		where id_project = p_id_project
	), board_details_ds as (
		select
			bd.*,
			json_agg(row_to_json(t.*)) tasks,
			count(t.id) total_tasks
		from board_details bd
		join boards_ds b on b.id = bd.id_board
		join v_cf_tasks t on t.id_board_det = bd.id
		group by bd.id
	), board_details_json as (
		select
			id_board,
			row_to_json(d.*) details_data
		from board_details_ds d
	)
	select
		b.id,
		row_to_json(b.*) board_data,
		bd.details_data
	from boards_ds b
	join board_details_json bd on bd.id_board = b.id;
end;
$$ language plpgsql