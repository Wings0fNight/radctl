import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Layout = () => {
	return (
		<div className="flex h-screen bg-white">
			<NavBar />
			<div className="flex-1">
				<Outlet />
			</div>
		</div>
	);
} 