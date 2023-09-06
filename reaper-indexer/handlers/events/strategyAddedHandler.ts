import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { Strategy } from "../../entities/Strategy.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp } from "../helpers.ts";

export const strategyAddedHandler: EventHandlerFor<typeof VAULT_V2_ABI, 'StrategyAdded'> = async ({ event, logger, contract, client, store }) => {
    try {
        const { strategy, feeBPS, allocBPS } = event.args;
        const block = Number(event.blockNumber)

        const blockTimestamp = await getBlockTimestamp(client, store, event)

        const contractAddress = event.address as string;

        const chain = await getChainOrCreate(store, client);
        const vault = await getVaultOrCreate(client, event, contractAddress, chain);

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

        newStrategy.save();

        logger.info(`strategy added - ${strategy}`);
    } catch (error) {
        logger.error(error);
    }

}