import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import houseSVG from '../assets/house.svg';
import keySVG from '../assets/key-square.svg';
import userSVG from '../assets/user-round.svg'
import logoutSVG from '../assets/log-out.svg'

const AdminLinks = () => {
	if (JSON.parse(localStorage.getItem("userData")).role !== "admin") return null;
	else return (
		<>
			<Link to="/users" className="p-2 hover:bg-gray-400 rounded">
				<img src={userSVG} alt="Users" className="top-1/2 items-center w-7 h-7" />
				{/* <p className=''>Пользователи</p> */}
			</Link>
		</>
	);
};



const Exit = () => {
	const navigate = useNavigate();
	// const username = localStorage.getItem("username");
	// const userData = JSON.parse(localStorage.getItem("userData"));
	const handleLogout = () => {
		localStorage.removeItem('isAuthenticated');
		localStorage.removeItem('username');
		localStorage.removeItem('userData');
		navigate('/auth');
	};

	return (
		<div className="p-2 hover:bg-gray-400 rounded absolute bottom-5">
			<button onClick={handleLogout}><img src={logoutSVG} alt="" className="top-1/2 items-center w-7 h-7 "/></button>
		</div>
		
	)
}
export function NavBar () {
	return (
		<nav className="bg-gray-800 h-screen w-20 text-white font-medium relative">
			{/* <UserProfile /> */}
			<div className="p-4 flex flex-col gap-2">
				<Link to="/" className="p-2 hover:bg-gray-400 rounded">
					<img src={houseSVG} alt="home" className="top-1/2 items-center w-7 h-7" />
					{/* <p className=''>Главная</p> */}
				</Link>
				<Link to="/change-password" className="p-2 hover:bg-gray-400 rounded">
					<img src={keySVG} alt="ch-pass" className="top-1/2 items-center w-7 h-7" />
					{/* <p className=''>Смена пароля</p> */}
				</Link>
				<AdminLinks />
				<Exit />
			</div>		
		</nav>
	);
}