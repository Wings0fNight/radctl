import axios from "axios";

const logoutAPI = axios.create({
	baseURL: "http://10.101.28.50:7881", 
});
export const logout = async (token) => {
	const response = await logoutAPI.post('/login/logout', {},
	 {
		headers: {
			'Token': `${token}`,
			'Access-Control-Allow-Origin':'*',
		},
	},);
	return response;
};