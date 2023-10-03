import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setChains, setSelectedChain } from "../redux/slices/blockchainSlice";
import { RootState } from "../redux/store";
import { setVaults } from "../redux/slices/vaultsSlice";
import axios from "axios";
import { setInitialized } from "../redux/slices/appSlice";
import { setTokens } from "../redux/slices/reaperSlice";
import { processVaults } from "../utils/processing";

export const useLoadData = () => {
    const dispatch = useDispatch();
    const selectedChain = useSelector(
        (state: RootState) => state.blockchain.selectedChain
    );

    useEffect(() => {
        loadAndProcessData();
    }, []);

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

        dispatch(setTokens(tokensData));
        dispatch(setVaults(processedVaults));
        dispatch(setChains(chainsData));

        dispatch(setInitialized(true));
    };
}