import axios from "axios";

const editAPI = axios.create({
	baseURL: "http://10.101.28.50:7881",
});

export const edit = async (XXX) => {

	const response = await authAPI.post('/', {},
	 {
		headers: {
			'':'',
			'Access-Control-Allow-Origin':'*',
		},
	},);

	console.log("Ответ сервера:", response.data);					//DEBUG:ТЕСТОВАЯ ФУНКИЦЯ ПРОВЕРКИ ОТВЕТА СЕРВЕРА

	return response;
};