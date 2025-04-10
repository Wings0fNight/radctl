import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/auth/AuthAPI";
import userSVG from "../assets/user-round.svg";
import lockSVG from "../assets/lock-keyhole.svg";
import Particles from '../components/background/Particles';

const AuthForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const response = await auth(username, password);
			if (response.data.auth === true) {
				localStorage.setItem("userData", JSON.stringify(response.data.res));
				localStorage.setItem("auth", response.data.auth);
				navigate('/');
			} else {
				setError("Неверный логин или пароль");
			}
		} catch (error) {
			setError("Неверный логин или пароль")
			console.error(error);														//DEBUG:ТЕСТОВЫЙ ВЫВОД ОШИБКИ ОТ СЕРВЕРА
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative h-screen bg-[#00008B]">
			<div className="absolute inset-0 z-0">
				<Particles
					particleColors={['#38a9ff', '#38ffe8']}
					particleCount={500}
					particleSpread={20}
					speed={0.1}
					particleBaseSize={500}
					moveParticlesOnHover={false}
					alphaParticles={false}
					disableRotation={true}
				/>
			</div>
			<div className="relative z-10 flex items-center justify-center h-full p-10">
			<div className="w-[40%] rounded-3xl bg-[rgba(53,53,53,0.97)] p-10 text-white shadow-2xl shadow-gray-900">
					<h1 className="text-5xl font-bold mb-10 text-center">Авторизация</h1>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="relative z-0 w-full mb-5 group">
							<img src={userSVG} alt="User" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
							<input 
								className="pl-10 p-4 block py-2.5 px-0 w-full text-smbg-transparent border-0 border-b-2 appearance-none text-white border-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								disabled={isLoading}
							/>
						</div>
						<div className="relative">
							<img src={lockSVG} alt="Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
							<input
								className="pl-10 p-4 block py-2.5 px-0 w-full text-smbg-transparent border-0 border-b-2 appearance-none text-white border-gray-500 focus:border-blue-500 focus:outline-none focus:ring-0  peer"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={isLoading}
							/>
						</div>
						<div className="text-left">
							<p>
								Используй логин и парль от <span className="font-bold">AD</span>
							</p>
						</div>

						{error && <p className="text-red-500 font-bold text-center">{error}</p>}
						<div className="flex justify-center mt-3">
							<button 
								type="submit" 
								disabled={isLoading}
								className="w-[50%] bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl">
								{isLoading ? "Авторизация..." : "Войти"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
	);
};
export default AuthForm