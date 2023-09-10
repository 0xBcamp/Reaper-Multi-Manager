import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { Strategy } from "../../entities/Strategy.ts";
import { getBlockTimestamp, isVaultWhitelisted } from "../helpers.ts";

export const strategyRevokedHandler: EventHandlerFor<typeof VAULT_V2_ABI, 'StrategyRevoked'> = async ({ event, logger, contract, client, store }) => {
    try {
        const { strategy } = event.args;
        const vaultAddress = event.address;

        if (await isVaultWhitelisted(store, vaultAddress)) {
            const strategyDB = await Strategy.findOne({ address: strategy, vaultAddress });

            if (strategyDB) {
                const blockTimestamp = await getBlockTimestamp(client, store, event)
    
                strategyDB.isActive = false;
                strategyDB.dateRevoked = blockTimestamp;
    
                strategyDB.save();
            }
        }
    } catch (error) {
        logger.error(error);
    }

}