import React from 'react';
import { useNavigate } from 'react-router-dom';
	

const Home = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");
	const userData = JSON.parse(localStorage.getItem("userData"));
	const handleLogout = () => {
		localStorage.removeItem('isAuthenticated');
		localStorage.removeItem('username');
		localStorage.removeItem('userData');
		navigate('/auth');
	};


	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<h1>username: {username} </h1>
			<h1>server response: {userData.role},{userData.message}</h1>
			<button onClick={handleLogout}>Выйти</button>
		</div>
	);
};

export default Home;