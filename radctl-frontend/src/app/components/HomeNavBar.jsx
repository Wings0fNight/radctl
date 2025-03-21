import { UserProfile } from './HomeUserProfile'

export function NavBar () {
	return (
		<nav className="bg-gray-300 h-screen w-60">
			<div className="flex space-x-4">
			<UserProfile />

			</div>			
		</nav>
	);
}