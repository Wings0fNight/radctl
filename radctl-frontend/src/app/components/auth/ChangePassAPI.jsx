import axios from "axios";

const chPasswdAPI = axios.create({
	// baseURL: "http://10.101.28.50:7881",							//FIXME: Включить после коннекта базы пользователей
});

export const chPasswd = async (username, oldPassword, newPassword, confirmPassword) => {
	console.log(username, oldPassword, newPassword, confirmPassword);
	// const credentials = btoa(`${username}:${password}`);			//FIXME: После коннекта базы пользователей обновить функцию отправки смены пароля
	const response = await authAPI.post('/', {},					//FIXME: Прописать путь полсе коннекта базы пользователей
	 {
		headers: {
			'Authorization': `${credentials}`,						//FIXME: После коннекта базы пользователей обновить функцию отправки смены пароля
			'Access-Control-Allow-Origin':'*',
		},
	},);

	console.log("Ответ сервера:", response.data);					//DEBUG: ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТВЕТА СЕРВЕРА

	return response;
};