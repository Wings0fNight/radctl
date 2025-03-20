import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (!isAuthenticated) {
		return <Navigate to="/auth" />;
	}

	return children;
};

export default ProtectRoute;