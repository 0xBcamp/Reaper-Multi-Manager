import { useDispatch, useSelector } from "react-redux";
import { ChainListDocument } from "../gql/graphql";
import { executeGQL } from "../lib/excecuteGraphQL";
import { useEffect } from "react";
import { Chain, setChains, setSelectedChain } from "../redux/slices/blockchainSlice";
import { RootState } from "../redux/store";


export const useLoadData = () => {
    const dispatch = useDispatch();
    const selectedChain = useSelector((state: RootState) => state.blockchain.selectedChain);

    useEffect(() => {
        fetchChains();
    }, []);



    const fetchChains = async () => {
        try {
            const results = await executeGQL(ChainListDocument);
            const chains = results.Chains as Chain[];

            // Assuming results has a data property that matches ChainListQuery structure
            if (chains && Array.isArray(chains)) {
                dispatch(setChains(chains));
                if (!selectedChain && chains.length > 0) {
                    dispatch(setSelectedChain(chains[0]))
                }
            }
        } catch (error) {
            console.error("Error fetching chains:", error);
        }
    };
}