import {
	LuAlignLeft,
	LuArchive,
	LuArrowDownUp,
	LuArrowLeft,
	LuBell,
	LuBookText,
	LuBox,
	LuBoxes,
	LuCalendarDays,
	LuCheck,
	LuChevronDown,
	LuChevronLeft,
	LuChevronRight,
	LuChevronUp,
	LuCirclePlus,
	LuCircleX,
	LuComponent,
	LuEllipsis,
	LuEllipsisVertical,
	LuEye,
	LuFile,
	LuFileImage,
	LuGithub,
	LuLayoutDashboard,
	LuLoaderCircle,
	LuMoon,
	LuPaperclip,
	LuPencil,
	LuSearch,
	LuSun,
	LuTags,
	LuTrash2,
	LuTruck,
	LuUsersRound,
	LuWrench,
} from "react-icons/lu"

const Icons = {
	Misc: {
		Archive: LuArchive,
		Books: LuBookText,
		Error: LuCircleX,
		Box: LuBox,
		Boxes: LuBoxes,
		Component: LuComponent,
		Sun: LuSun,
		Moon: LuMoon,
		Menu: LuEllipsis,
		MenuVertical: LuEllipsisVertical,
		Clip: LuPaperclip,
		Image: LuFileImage,
		AlignLeft: LuAlignLeft,
		Calendar: LuCalendarDays,
		Dashboard: LuLayoutDashboard,
		Users: LuUsersRound,
		Tags: LuTags,
		UpDown: LuArrowDownUp,
	},
	Navbar: {
		Home: LuLayoutDashboard,
		Load: LuTruck,
		Users: LuUsersRound,
	},
	Actions: {
		Add: LuCirclePlus,
		Edit: LuPencil,
		Loading: LuLoaderCircle,
		Delete: LuTrash2,
		Search: LuSearch,
		File: LuFile,
		Accept: LuCheck,
		DropdownOpen: LuChevronDown,
		DropdownClosed: LuChevronUp,
		PaginationLeft: LuChevronLeft,
		PaginationRight: LuChevronRight,
		Show: LuEye,
		Back: LuArrowLeft,
		Settings: LuWrench,
		Notification: LuBell,
	},
	Social: {
		Github: LuGithub,
	},
}

export default Icons
