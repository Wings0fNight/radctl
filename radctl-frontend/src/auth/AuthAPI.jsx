import axios from "axios";

const authAPI = axios.create({
	baseURL: "http://localhost:5000", 								//ВПИСАТЬ URL ДЛЯ ОТПРАВКИ ЗАПРОСА НА АВТОРИЗАЦИЮ
	headers: {
		"Content-type": "application/json",
	},
});


export const auth = async (username, password) => {
	const credentials = btoa(`${username}:${password}`);

	console.log("Отправляемые данные:", {							//ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТПРАВКИ СООБЩЕНИЯ НА СЕРВЕР
		username,
		password,
		credentials,
	  });

	const response = await authAPI.post('/auth', {}, {
		headers: {
			'Authorization': `Basic ${credentials}`,
		},
	});

	console.log("Ответ сервера:", response.data);					//ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТВЕТА СЕРВЕРА

	return response;
};