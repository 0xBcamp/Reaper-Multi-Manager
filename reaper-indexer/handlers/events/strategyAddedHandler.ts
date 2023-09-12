import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { Strategy } from "../../entities/Strategy.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp, isVaultWhitelisted } from "../helpers.ts";

export const strategyAddedHandler: EventHandlerFor<typeof VAULT_V2_ABI, 'StrategyAdded'> = async ({ event, logger, contract, client, store }) => {
    try {
        const { strategy, feeBPS, allocBPS } = event.args;

        const contractAddress = event.address as string;
        const chainId = await client.getChainId();

        if (await isVaultWhitelisted(store, contractAddress, chainId)) {
            const block = Number(event.blockNumber)

            const blockTimestamp = await getBlockTimestamp(client, store, event)

            const chain = await getChainOrCreate(store, chainId);
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

            await newStrategy.save();
        }
    } catch (error) {
        logger.error(error);
    }

}