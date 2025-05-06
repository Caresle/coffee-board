import {
	LuArrowLeft,
	LuBell,
	LuBox,
	LuBoxes,
	LuChevronDown,
	LuChevronUp,
	LuCirclePlus,
	LuCircleX,
	LuComponent,
	LuEye,
	LuFile,
	LuGithub,
	LuLayoutDashboard,
	LuLoaderCircle,
	LuMoon,
	LuPencil,
	LuSearch,
	LuSun,
	LuTrash2,
	LuTruck,
	LuUsersRound,
	LuWrench,
} from "react-icons/lu"

const Icons = {
	Misc: {
		Error: LuCircleX,
		Box: LuBox,
		Boxes: LuBoxes,
		Component: LuComponent,
		Sun: LuSun,
		Moon: LuMoon,
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
		DropdownOpen: LuChevronDown,
		DropdownClosed: LuChevronUp,
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
