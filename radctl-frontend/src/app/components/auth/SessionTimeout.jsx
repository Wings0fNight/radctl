import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useSessionTimeout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkSessionTimeout = () => {
			const ExpiresAt = localStorage.getItem("sessionTimeout");
			if (!ExpiresAt) return;
			const now = new Date().getTime();
			if (now > ExpiresAt) {
				localStorage.clear();
				navigate("/auth");
			}
		};
		checkSessionTimeout();

		const interval = setInterval(() => {
			checkSessionTimeout();
		}, 60000);

		return () => clearInterval(interval);
	}, [navigate]);
};
