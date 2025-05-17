CREATE TABLE tasks (
	id serial NOT NULL,
	id_board_det int NOT NULL,
	name varchar(255) NOT NULL,
	description text NULL,
	date_begin date NULL,
	date_end date NULL,
	id_priority int NULL,
	id_assigned int NULL,
	time_estimation float NULL,
	created_at timestamp DEFAULT now() NOT NULL,
	CONSTRAINT tasks_pkey PRIMARY KEY (id),
	CONSTRAINT tasks_id_assigned_fkey FOREIGN KEY (id_assigned) REFERENCES public.users(id),
	CONSTRAINT tasks_id_board_det_fkey FOREIGN KEY (id_board_det) REFERENCES public.board_details(id) ON DELETE CASCADE,
	CONSTRAINT tasks_id_priority_fkey FOREIGN KEY (id_priority) REFERENCES public.priorities(id)
);

create table task_tags (
	id serial primary key,
	id_tag int not null,
	id_task int not null,
	foreign key (id_tag)
		references tasks(id)
		on delete cascade
);