import React from "react";
import { Navigate, Outlet} from "react-router-dom";

const ProtectRoute = ({ children }) => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace/>;
	}

	return <Outlet/>;
};

export default ProtectRoute;