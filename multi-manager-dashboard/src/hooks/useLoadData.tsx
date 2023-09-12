import { useDispatch, useSelector } from "react-redux";
import { ChainListDocument, VaultListDocument, VaultSnapshotsDocument, VaultTransactionsDocument } from "../gql/graphql";
import { executeGQL } from "../lib/excecuteGraphQL";
import { useEffect } from "react";
import { Chain, setChains, setSelectedChain } from "../redux/slices/blockchainSlice";
import { RootState } from "../redux/store";
import { setVaultSnapshots, setVaultTransactions, setVaults } from "../redux/slices/vaultsSlice";


export const useLoadData = () => {
    const dispatch = useDispatch();
    const selectedChain = useSelector((state: RootState) => state.blockchain.selectedChain);

    useEffect(() => {
        fetchChains();
        fetchVaults();
        fetchVaultSnapshots();
        fetchVaultTransactions();
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

    const fetchVaults = async () => {
        try {
            const results = await executeGQL(VaultListDocument);
            console.log("results", results)
            //const chains = results.Vaults as Chain[];

            // Assuming results has a data property that matches ChainListQuery structure
            if (results && Array.isArray(results.Vaults)) {
                dispatch(setVaults(results.Vaults));
            }
        } catch (error) {
            console.error("Error fetching vaults:", error);
        }
    };

    const fetchVaultSnapshots = async () => {
        try {
            const results = await executeGQL(VaultSnapshotsDocument);
            if (results && Array.isArray(results.VaultSnapshots)) {
                dispatch(setVaultSnapshots(results.VaultSnapshots));
            }
        } catch (error) {
            console.error("Error fetching vault snapshots:", error);
        }
    };

    const fetchVaultTransactions = async () => {
        try {
            const results = await executeGQL(VaultTransactionsDocument);

            if (results && Array.isArray(results.VaultTransactions)) {
                dispatch(setVaultTransactions(results.VaultTransactions));
            }
        } catch (error) {
            console.error("Error fetching vault transactions:", error);
        }
    };
}