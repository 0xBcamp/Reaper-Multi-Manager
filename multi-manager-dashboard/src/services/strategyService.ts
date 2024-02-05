import axios from "axios";

const apiUrl = process.env.REACT_APP_API;

export interface UserReserveData {
    currentATokenBalance: string;
    currentStableDebt: string;
    currentVariableDebt: string;
    principalStableDebt: string;
    scaledVariableDebt: string;
    stableBorrowRate: string;
    liquidityRate: string;
    stableRateLastUpdated: string;
    usageAsCollateralEnabled: boolean;
}

export const addUserReserveData = async (strategyId: string, request: UserReserveData) => {
	return (await axios.post(`${apiUrl}/strategies/update/${strategyId}/userreservedata`, request)).data;
};