import axios from "axios";

const authAPI = axios.create({
	baseURL: "http://10.101.28.50:7881",
});

export const auth = async (username, password) => {
	const credentials = btoa(`${username}:${password}`);
	const response = await authAPI.post('/login/auth', {},
	 {
		headers: {
			'Authorization': `${credentials}`,
			'Access-Control-Allow-Origin':'*',
		},
	},);

	console.log("Ответ сервера:", response.data);					//DEBUG:ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТВЕТА СЕРВЕРА

	return response;
};