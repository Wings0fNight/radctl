import { Link } from 'react-router-dom';
import { UserProfile } from './UserProfile'

export function NavBar () {
	return (
		<nav className="bg-gray-300 h-screen w-60">
			<UserProfile />
			<div className="p-4 flex flex-col gap-2">
				<Link to="/" className="p-2 hover:bg-gray-400 rounded">Главная</Link>
				<Link to="/profile" className="p-2 hover:bg-gray-400 rounded">Профиль</Link>
				<Link to="/change-password" className="p-2 hover:bg-gray-400 rounded">Смена пароля</Link>
				{/* <AdminLinks /> */}
			</div>		
		</nav>
	);
}