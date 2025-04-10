import emailSVG from '../../assets/mail.svg';
import userAccessSVG from '../../assets/user-round-check.svg'
import userPassSVG from '../../assets/key-square-black.svg'
import clockSVG from '../../assets/clock-1.svg'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function UserProfile() {
	const maxConnections = 200;												//FIXME: После получения от сервера - обновить на получение из localstorage
	const userUsedConnections = 0;											//FIXME: После получения от сервера - обновить на получение из localstorage
	const remainingConnections = maxConnections - userUsedConnections;
    const percentage = (remainingConnections / maxConnections) * 100;

	const getColor = (percent) => {
		if (percent < 25) return '#EF4444';
		if (percent < 50) return '#F59E0B';
		if (percent < 75) return '#edff29';
		return '#10B981';
	};

	const userData = JSON.parse(localStorage.getItem("userData"));
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch pl-10 pr-10 '>
			<div className="h-full max-w-[95%] p-6 bg-white border border-gray-300 rounded-lg shadow-md mb-10 flex flex-col">
				<h1 className='text-3xl font-black text-left pl-3'>
					Привет, {userData.displayName}
				</h1>
				<div className="flex flex-col pt-2">
					<div className='relative'>
						<img src={emailSVG} alt="User" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
						<p className='text-left pl-10'>{userData.email}</p>
					</div>
					<div className='relative'>
						<img src={userAccessSVG} alt='User' className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5' />
						<p className='text-left pl-10'>Учетная запись <span className='font-bold'>{userData.uname}</span> активна до: <span className='font-bold text-red-600'> ДАТА </span></p>
					</div>
					<div className='relative'>
						<img src={userPassSVG} alt='User' className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5' />
						<p className='text-left pl-10'>Пароль действителен до: <span className='font-bold text-red-600'> ДАТА </span></p>
					</div>
					<div className='relative'>
						<img src={clockSVG} alt='User' className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5' />
						<p className='text-left pl-10 font-bold'>Синзронизация базы пользователей производится один раз в час!</p>
					</div>
				</div>
			</div>
			<div className="h-full max-w-[95%] p-6 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col items-center">
				<p className="text-xl font-black pb-5">Доступно подключений:</p>
				<div className="w-32 h-32">
					<CircularProgressbar 
					value={percentage} 
					text={`${remainingConnections}/${maxConnections}`}
					styles={{
						path: {
							stroke: getColor(percentage),
							strokeLinecap: 'round',
						},
						trail: {
							stroke: '#F3F4F6',
						},
						text: {
							fontSize: '16px',
							fontWeight: 'bold',
							fill: '#1F2937',
						}
					}}
					/>
				</div>
			</div>
		</div>
	);
}