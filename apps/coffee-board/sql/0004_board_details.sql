create table board_details (
	id serial primary key,
	id_board int not null,
	name varchar(255) not null,
	board_order int default 0 not null,
	deleted smallint default 0 not null,
	created_at timestamp default now() not null,
	foreign key (id_board)
		references boards(id)
		on delete cascade
);