insert into permissions(id, name, action_type)
values
	(1, 'Read Tags', 'GET'),
	(2, 'Create Tag', 'POST'),
	(3, 'Update Tag', 'PUT'),
	(4, 'Delete Tag', 'DELETE'),
	(5, 'Read Priority', 'GET'),
	(6, 'Create Priority', 'POST'),
	(7, 'Update Priority', 'PUT'),
	(8, 'Delete Priority', 'DELETE'),
	(9, 'Read Projects', 'GET'),
	(10, 'Create Project', 'POST'),
	(11, 'Update Project', 'PUT'),
	(12, 'Delete Project', 'DELETE'),
	(13, 'Read Boards', 'GET'),
	(14, 'Create Boards', 'POST'),
	(15, 'Update Boards', 'PUT'),
	(16, 'Delete Boards', 'DELETE'),
	(17, 'Read Board Dets', 'GET'),
	(18, 'Create Board Dets', 'POST'),
	(19, 'Update Board Dets', 'PUT'),
	(20, 'Delete Board Dets', 'DELETE'),
	(21, 'Read Calendar', 'GET'),
	(22, 'Create Calendar', 'POST'),
	(23, 'Update Calendar', 'PUT'),
	(24, 'Delete Calendar', 'DELETE'),
	(25, 'Read Settings', 'GET'),
	(26, 'Update Settings', 'POST'),
	(27, 'Read Tasks', 'GET'),
	(28, 'Create Tasks', 'POST'),
	(29, 'Update Tasks', 'PUT'),
	(30, 'Delete Tasks', 'DELETE');


select setval('permissions_id_seq', 30);

-- Admin role permissions
insert into permissions_app_role(id_app_role, id_permission, allowed)
select
	1,
	id,
	1::bit
from permissions;

-- Regular user permissions

insert into permissions_app_role(id_app_role, id_permission, allowed)
select
	2,
	id,
	1::bit
from permissions
where
	id <= 30;