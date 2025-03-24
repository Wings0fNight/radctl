import React from "react";
import { Navigate } from "react-router-dom";


const AdminProtect = ({ children }) => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace/>;
	}

	const userData = JSON.parse(localStorage.getItem("userData"));

	if (userData.role !== "admin") {
		return <Navigate to="/" replace/>;
	} else {
		return children;
	}
};

export default AdminProtect;