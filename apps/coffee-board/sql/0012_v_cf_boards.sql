create view v_cf_boards as (
	with board_header as (
		select * from boards
	), board_details as (
		select
			*
		from board_details bd
		where deleted = 0
		order by bd.id_board, bd.board_order
	), board_details_json as (
		select
			bd.id_board,
			json_agg(bd.*) details
		from board_details bd
		group by bd.id_board
	)
	select
		bh.*,
		bd.details
	from board_header bh
	left join board_details_json bd on bd.id_board = bh.id
)