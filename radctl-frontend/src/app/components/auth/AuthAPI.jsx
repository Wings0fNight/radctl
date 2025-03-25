import axios from "axios";

const authAPI = axios.create({
	baseURL: "http://10.101.28.50:7881", 								//ВПИСАТЬ URL ДЛЯ ОТПРАВКИ ЗАПРОСА НА АВТОРИЗАЦИЮ
});

export const auth = async (username, password) => {
	const credentials = btoa(`${username}:${password}`);

	// console.log("Отправляемые данные:", {							//ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТПРАВКИ СООБЩЕНИЯ НА СЕРВЕР
	// 	username,
	// 	password,
	// 	credentials,
	//   });


	const response = await authAPI.post('/login/auth', {},
	 {
		headers: {
			'Authorization': `${credentials}`,
			'Access-Control-Allow-Origin':'*',
		},
	},);

	// const proxy = 'https://cors-anywhere.herokuapp.com/';
	// const srv = 'http://10.101.28.50:7881/login/auth';


	// const response = await fetch('http://10.101.28.50:7881/login/auth', {
	// 	method: 'POST',
	// 	body: "",
	// 	headers: {
	// 	'Authorization': `${credentials}`,
	// 	'Access-Control-Allow-Origin':'*',
	// 	},

	// })
	console.log("Ответ сервера:", response.data);					//ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТВЕТА СЕРВЕРА

	return response;
};