import { Outlet } from "react-router-dom";
import { NavBarRadUsers } from "./AdmNavRadUsers";

export const LayoutRadUsers = () => {
	return (
		<>
			<NavBarRadUsers />
			<Outlet />
		</>
	);
} 