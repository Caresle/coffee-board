-- insert initial tags
insert into tags (id, name, color)
values
	(1, 'needs help', '#f97316'),
	(2, 'bug', '#dc2626'),
	(3, 'feature', '#16a34a'),
	(4, 'hotfix', '#b91c1c'),
	(5, 'refactor', '#7c3aed'),
	(6, 'devops', '#0ea5e9'),
	(7, 'frontend', '#facc15'),
	(8, 'backend', '#4b5563'),
	(9, 'API', '#3b82f6'),
	(10, 'database', '#10b981');

select setval('tags_id_seq', 10);
	
-- Insert initial priorities 
insert into priorities (id, name, value)
values
	(1, 'critical', 4),
	(2, 'high', 3),
	(3, 'medium', 2),
	(4, 'low', 1);

select setval('priorities_id_seq', 4);

-- Insert initial users
insert into users (id, username, first_name, last_name, email, password, app_role)
values
	(1, 'caresle', 'Caresle', 'Elserac', 'test@test.com', 'NOT SECURE PASSWORD', 1),
	(2, 'Aresle', 'Aresle', 'Elsera', 'aresle@test.com', 'NOT SECURE PASSWORD', 1);

select setval('users_id_seq', 2);

-- Insert initial projects
insert into projects (id, name, description, id_user, visibility, deleted)
values
    (1, 'Gym system', 'A mobile app for the gym owner to manage suscriptions', 1, 'private', 0),
    (2, 'Inventory', 'For the inventory of the coffee shop', 1, 'private', 1),
    (3, 'Task Manager', 'A web app to manage personal and team tasks', 2, 'public', 0),
    (4, 'Book Tracker', 'Tracks reading progress and book collections', 1, 'public', 1);

select setval('projects_id_seq', 4);

-- insert initial board
insert into boards (id, id_project, name, description, deleted, visibility)
values 
	(1, 1, 'general', null, 0, 'private'),
	(2, 1, 'marketing', null, 0, 'private');

select setval('boards_id_seq', 2);

insert into board_details(id, id_board, name, board_order, deleted)
values
	(1, 1, 'in progress', 2, 0),
	(2, 1, 'done', 3, 0),
	(3, 1, 'todo', 1, 0),
	(4, 2, 'in progress', 2, 0),
	(5, 2, 'done', 3, 0),
	(6, 2, 'todo', 1, 0);

select setval('board_details_id_seq', 6);

-- Tasks
insert into tasks (
	id, id_board_det, name,
	description, date_begin, date_end,
	id_priority , id_assigned, time_estimation
)
values
(
	1, 1, 'Workouts section',
	'Task related with the workouts module', null, null,
	null, null, null
),
(
	2, 1, 'Workout with priority',
	'Description of the task', null, null,
	1, null, null
),
(
	3, 1, 'Workout with priority 2',
	null, null, null,
	2, null, null
),
(
	4, 1, 'Workout with priority 3',
	null, null, null,
	3, null, null
),
(
	5, 1, 'Workout with priority 3',
	null, null, null,
	4, null, null
);


select setval('tasks_id_seq', 5);

-- task tags
insert into task_tags (id, id_tag, id_task)
values (1, 1, 1), (2, 1, 2), (3, 2, 1), (4, 3, 2);

select setval('task_tags_id_seq', 4);

-- task checklists
insert into task_checklist (id, id_task, name)
values (1, 3, 'Workflow done'), (2, 4, 'Requirements');

select setval('task_checklist_id_seq', 2);

insert into task_checklist_det (id, id_checklist, name, completed, level, id_parent)
values
	(1, 1, 'Task 1', 0, 1, null),
	(2, 1, 'Task 2', 0, 1, null),
	(3, 1, 'Task 2 - 1', 0, 2, 2),
	(4, 1, 'Task 2 - 2', 1, 2, 2),
	(5, 1, 'Task 3', 0, 1, null);

select setval('task_checklist_det_id_seq', 5);

insert into task_history(id, id_task, msg, stamp, id_user)
values (1, 1, 'Message 1', '2025-05-31 08:53:00', 1),
	(2, 1, 'Message 2', '2025-05-31 08:54:00', 1),
	(3, 1, 'Message 3', '2025-05-31 09:53:00', 2),
	(4, 1, 'Message 4', '2025-05-31 10:53:00', 1);


select setval('task_history_id_seq', 4);