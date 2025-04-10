import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth/AutoCheckAuth';

import userSVG from '../../assets/user-round-black.svg';
import robotSVG from '../../assets/bot.svg';
import groupSVG from '../../assets/users-round.svg';

const Users = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleToUsers = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/admins-radusers');
			} else {
				localStorage.clear();
				navigate('/auth');
			}
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.clear();
				navigate('/auth');
			}
		}
	};
	return (
		<li className="me-2">
			<button onClick={handleToUsers} className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-500 hover:border-blue-500 group'>
				<img src={userSVG} alt="" className="w-7 h-7 mr-1"/> Users
			</button>
		</li>
	)
}

const Robots = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleToRobots = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/admins-radrobots');
			} else {
				localStorage.clear();
				navigate('/auth');
			}
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.clear();
				navigate('/auth');
			}
		}
	};
	return (
		<li className="me-2">
			<button onClick={handleToRobots} className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-500 hover:border-blue-500 group'>
				<img src={robotSVG} alt="" className="w-7 h-7 mr-1"/> Robots
			</button>
		</li>
	)
}

const Groups = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleToGroup = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/admins-radgroups');
			} else {
				localStorage.clear();
				navigate('/auth');
			}
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.clear();
				navigate('/auth');
			}
		}
	};
	return (
		<li className="me-2">
			<button onClick={handleToGroup} className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-500 hover:border-blue-500 group'>
				<img src={groupSVG} alt="" className="w-7 h-7 mr-1"/> Groups
			</button>
		</li>
	)
}

const Limits = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleToLimits = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/admins-radlimits');
			} else {
				localStorage.clear();
				navigate('/auth');
			}
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.clear();
				navigate('/auth');
			}
		}
	};
	return (
		<li className="me-2">
			<button onClick={handleToLimits} className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-500 hover:border-blue-500 group'>
				 Limits
			</button>
		</li>
	)
}
export function NavBarRadUsers () {
	return (
		<div className='w-[100%] h-[7%] bg-gray-100'>
			<nav className="border-b border-gray-700">
				<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-900">
					<Users />
					<Robots />
					<Groups />
					<Limits />
				</ul>
			</nav>
		</div>
	);
};
