import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export interface IVaultCreateRequest {
    address: string,
    chainId: number
}

export const addVault = async (request: IVaultCreateRequest) => {
	return (await axios.post(`${apiUrl}/vaults`, request)).data;
};