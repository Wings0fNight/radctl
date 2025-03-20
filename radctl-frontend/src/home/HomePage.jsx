import React from 'react';
import { useNavigate } from 'react-router-dom';
	

const Home = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('isAuthenticated');
		navigate('/auth');
	};

	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<h1>username: </h1>
			<button onClick={handleLogout}>Выйти</button>
		</div>
	);
};

export default Home;