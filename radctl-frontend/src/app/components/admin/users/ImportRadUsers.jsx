import axios from "axios";
import { Navigate } from "react-router-dom";

const importAPI = axios.create({
	baseURL: "http://10.101.28.50:7881",
});

export const importUsers = async (token, {signal} = {}) => {
	if (!token) {
		throw new Error('Token not found');
	};
	const response = await importAPI.post('/users/show', {},
		{
			headers: {
				'Token': `${token}`,
				'Access-Control-Allow-Origin':'*',
			},
			signal,
		});
		console.log("Ответ сервера:", response.data);		//DEBUG: ВРЕМЕННАЯ ДЛЯ ДЕБАГОВ
	return response;
};