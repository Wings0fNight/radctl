import React from 'react';


const userData = localStorage.getItem('userData');
export function Home () {
	return (
		<div className='h-screen bg-white'>
			<h1>Home</h1>
			<p>{userData.uname}</p>
		</div>
	);
};
