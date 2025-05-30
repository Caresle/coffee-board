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