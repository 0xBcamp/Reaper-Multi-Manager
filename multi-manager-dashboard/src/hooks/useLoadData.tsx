import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setChains } from "../redux/slices/blockchainSlice";
import { setVaults } from "../redux/slices/vaultsSlice";
import axios from "axios";
import { setInitialized } from "../redux/slices/appSlice";
import { setTokens } from "../redux/slices/reaperSlice";
import { processVaults } from "../utils/processing";
import { RootState } from "../redux/store";
import { setStrategies } from "../redux/slices/strategiesSlice";

export const useLoadData = () => {
    const dispatch = useDispatch();

    const lastRefetch = useSelector((state: RootState) => state.app.lastRefetch);

    useEffect(() => {
        loadAndProcessData();
    }, [lastRefetch]);

    const fetchFromApi = async (endpoint: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}${endpoint}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const loadAndProcessData = async () => {
        const [vaultsData, chainsData, tokensData] = await Promise.all([
            fetchFromApi('/dto/vaults'),
            fetchFromApi('/dto/chains'),
            fetchFromApi('/dto/tokens')
        ]);

        const processedVaults = processVaults(vaultsData);

        dispatch(setStrategies(processedVaults.reduce((accumulator, vault) => {
            return accumulator.concat(vault.strategies);
        }, [])));

        dispatch(setTokens(tokensData));
        dispatch(setVaults(processedVaults));
        dispatch(setChains(chainsData));

        dispatch(setInitialized(true));
    };
}