

export function UserProfile() {

	return (
		<div className="bg-gray-500 h-60 w-60 flex items-center justify-center">
			<div className='relative'>
				<div className='grid grid-cols-2 gap-2 m-2'>
					<p>{username}</p>
					<p>{userData.email}</p>
				</div>
			</div>
		</div>
	);
}