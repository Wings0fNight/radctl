import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../components/auth/LogoutApi';
import { auth } from '../components/auth/AutoCheckAuth';

import siteIcon from '../assets/icon-bar.svg'
import houseSVG from '../assets/house.svg';
import keySVG from '../assets/key-square.svg';
import usersSVG from '../assets/user-pen.svg';
import citySVG from '../assets/building-2.svg'
import logoutSVG from '../assets/log-out.svg'

const Home = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleToHome = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/');
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
		<div className="p-2 hover:bg-gray-400 rounded">
			<button onClick={handleToHome}><img src={houseSVG} alt="" className="h-7 flex flex-col items-center w-full"/>
			<p className='text-gray-300 text-xs text-center mt-1'>Home</p>
			</button>
		</div>	
	)
}

const ChangePassword = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleToChangPassword = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/change-password');
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
		<div className="p-2 hover:bg-gray-400 rounded">
			<button onClick={handleToChangPassword}><img src={keySVG} alt="" className="h-7 flex flex-col items-center w-full"/>
			<p className='text-gray-300 text-xs text-center mt-1'>Change Password</p>
			</button>
		</div>	
	)
}
const AdminsRadUsersSettings = () => {
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

	const handleToCity = async () => {
		try {
			const response = await auth(userData.token);
			if (response.data.auth === true) {
				navigate('/admins-city');
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
		<>
			<div className="p-2 hover:bg-gray-400 rounded">
				<button onClick={handleToUsers}><img src={usersSVG} alt="" className="h-7 flex flex-col items-center w-full"/>
				<p className='text-gray-300 text-xs text-center mt-1'>Radius Users</p>
				</button>
			</div>	
			<div className="p-2 hover:bg-gray-400 rounded">
				<button onClick={handleToCity}><img src={citySVG} alt="" className="h-7 flex flex-col items-center w-full"/>
				<p className='text-gray-300 text-xs text-center mt-1'>City</p>
				</button>
			</div>
		</>
	
	)
}


const Exit = () => {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const response = await logout(userData.token);
			if (response.data.auth === false) {
				localStorage.clear();
				navigate('/auth');
			}else {
				setError("Что-то пошло не так :(");
			}
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.clear();
				navigate('/auth');
			}
		}
	};
	return (
		<div className="p-2 m-3 hover:bg-gray-400 rounded absolute bottom-2 ">
			<button onClick={handleLogout}><img src={logoutSVG} alt="" className="h-7 flex flex-col items-center w-full"/>
			<p className='text-gray-300 text-xs text-center mt-1'>Exit</p>
			</button>
		</div>	
	)
}

//FIXME: ПОЧИНИТЬ ПОСЛЕ РАЗДЕЛЕНИЯ РОЛЕЙ

// const AdminLinks = () => {
// 	if (JSON.parse(localStorage.getItem("userData")).role !== "admin") return null;
// 	else return (
// 		<>
// 			<Link to="/users" className="p-2 hover:bg-gray-400 rounded">
// 				<img src={userSVG} alt="Users" className="top-1/2 items-center w-7 h-7" />
// 				{/* <p className=''>Пользователи</p> */}
// 			</Link>
// 		</>
// 	);
// };

export function NavBar () {
	return (
		<nav className="bg-gray-800 h-screen w-20 text-white font-medium relative">
			<div className="p-1 flex flex-col gap-2 w-full">
				<img src={siteIcon} alt="Site Icon" className="m-3 flex items-center w-12 h-12" />
				<Home />
				<ChangePassword />
				<AdminsRadUsersSettings />
				{/* <AdminLinks /> 			//FIXME: ПОЧИНИТЬ ПОСЛЕ РАЗДЕЛЕНИЯ РОЛЕЙ*/}
				<Exit />
			</div>		
		</nav>
	);
}