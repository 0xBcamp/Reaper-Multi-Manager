import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export const processEvents = async (): Promise<boolean> => {
	return (await axios.get(`${apiUrl}/events/process`)).data;
};