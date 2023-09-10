import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { Strategy } from "../../entities/Strategy.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp, isVaultWhitelisted } from "../helpers.ts";

export const strategyAddedHandler: EventHandlerFor<typeof VAULT_V2_ABI, 'StrategyAdded'> = async ({ event, logger, contract, client, store }) => {
    try {
        const { strategy, feeBPS, allocBPS } = event.args;

        const contractAddress = event.address as string;

        if (await isVaultWhitelisted(store, contractAddress)) {
            const block = Number(event.blockNumber)

            const blockTimestamp = await getBlockTimestamp(client, store, event)

            const chain = await getChainOrCreate(store, client);
            const vault = await getVaultOrCreate(client, event, contractAddress, chain, blockTimestamp);

            const newStrategy = new Strategy({
                block,
                hash: event.transactionHash,
                vault,
                vaultAddress: contractAddress,
                address: strategy,
                feeBPS,
                allocBPS,
                isActive: true,
                dateAdded: blockTimestamp,
                chainId: chain.chainId,
                chain
            });

            const savedStrategy = await newStrategy.save();

            if (vault.strategies) {
                vault.strategies.push(savedStrategy);
            } else {
                vault.strategies = [savedStrategy];
            }

            vault.save();
        }
    } catch (error) {
        logger.error(error);
    }

}