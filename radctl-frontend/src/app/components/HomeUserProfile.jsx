import userProfileIcon from '../assets/user.svg';
import exitIcon from '../assets/exit.svg';
import { useNavigate } from 'react-router-dom';

export function UserProfile() {
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
		<div className="bg-gray-500 h-60 w-60 flex items-center justify-center">
			<div className='relative'>
				<img src={userProfileIcon} alt="" className="items-center w-30 h-30 bg-white rounded-full border border-black"/>
				<div className='grid grid-cols-2 gap-2 m-2'>
				<div>
					<p>{username}</p>
					<p>{userData.email}</p>
				</div>
					<button onClick={handleLogout}><img src={exitIcon} alt="" className="w-10 h-10 "/></button>
				</div>
			</div>
			
		</div>
	);
}