import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/auth/AuthAPI";
import userSVG from "../assets/user.svg";
import lockSVG from "../assets/lock.svg";

const AuthForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	
	const parseMessage = (message) => {
		const resultParsed = {};
		message.split(',').forEach((item) => {
			const [key, value] = item.trim().split(':').map((item) => item.trim());
			resultParsed[key] = value;
		});
		return resultParsed;
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await auth(username, password);
			if (response.data.access === true) {
				localStorage.setItem("isAuthenticated", "true");
				localStorage.setItem("username", username);
				const parsedData = parseMessage(response.data.message);
				const updatedData = {...response.data, ...parsedData, };
				localStorage.setItem("userData", JSON.stringify(updatedData));
				navigate('/');
			} else {
				setError("Неверный логин или пароль");
			}
		} catch (error) {
			setError("Неверный логин или пароль")
			console.error(error);													//ТЕСТОВЫЙ ВЫВОД ОШИБКИ ОТ СЕРВЕРА
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen p-10">
			<div className="w-[40%] rounded-3xl bg-neutral-700 p-10 text-white shadow-2xl shadow-gray-900">
				<h1 className="text-5xl font-bold mb-10 text-center">Авторизация</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="relative">
						<img src={userSVG} alt="User" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
						<input 
							className="w-full pl-10 p-4 border border-gray-300 rounded"
							type="text"
							placeholder="corp\username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							disabled={isLoading}
						/>
					</div>
					<div className="relative">
						<img src={lockSVG} alt="Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
						<input
							className="w-full pl-10 p-4 border border-gray-300 rounded"
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
						<p>
							Писать <span className="font-bold">corp\</span> обязательно
						</p>
					</div>

					{error && <p className="text-red-500 font-bold text-center">{error}</p>}
					<div className="flex justify-center mt-3">
						<button 
							type="submit" 
							disabled={isLoading}
							className="w-[50%] bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl"
						>
							{isLoading ? "Авторизация..." : "Войти"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthForm