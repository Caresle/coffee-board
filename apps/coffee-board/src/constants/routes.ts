import Icons from "@/components/shared/icons"

const ROUTES_NAMES = {
	Dashboard: "Dashboard",
	Settings: "Settings",
	Projects: "Projects",
	Members: "Members",
	Tags: "Tags",
	Priorities: "Priorities",
}

export const ROUTES = [
	{
		name: ROUTES_NAMES.Dashboard,
		path: "/",
		icon: Icons.Misc.Dashboard,
	},
	{
		name: ROUTES_NAMES.Projects,
		path: "/projects",
		icon: Icons.Misc.Books,
	},
	{
		name: ROUTES_NAMES.Settings,
		path: "/settings",
		icon: Icons.Actions.Settings,
	},
	{
		name: ROUTES_NAMES.Members,
		path: "/members",
		icon: Icons.Misc.Users,
	},
	{
		name: ROUTES_NAMES.Tags,
		path: "/tags",
		icon: Icons.Misc.Tags,
	},
	{
		name: ROUTES_NAMES.Priorities,
		path: "/priorities",
		icon: Icons.Misc.UpDown,
	},
]
