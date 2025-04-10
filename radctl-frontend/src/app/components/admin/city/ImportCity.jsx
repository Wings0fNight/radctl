import axios from "axios";
import { Navigate } from "react-router-dom";

const importAPI = axios.create({
	baseURL: "http://10.101.28.50:7881",
});

export const importCity = async (token) => {
	if (!token) {
		localStorage.clear();
		Navigate('/auth');
		throw new Error('Token not found');
	};
	const response = await importAPI.post('/cities/show', {},
		{
			headers: {
				'Token': `${token}`,
				'Access-Control-Allow-Origin':'*',
			},
		},);
		console.log("Ответ сервера:", response.data);		//DEBUG: ВРЕМЕННАЯ ДЛЯ ДЕБАГОВ
	return response;
};