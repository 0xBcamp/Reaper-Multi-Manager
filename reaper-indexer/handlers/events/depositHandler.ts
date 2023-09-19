import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { VaultTransaction, VaultTransactionEnum } from "../../entities/VaultTransaction.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp, isVaultWhitelisted, getUserOrCreate } from "../helpers.ts";

export const depositHandler: EventHandlerFor<typeof VAULT_V2_ABI, "Deposit"> =
  async (
    { event, logger, contract, store, client },
  ) => {
    try {
      const { sender, owner, assets, shares } = event.args;

      const contractAddress = event.address as string;
      const chainId = await client.getChainId();

      const iswhitelisted = await isVaultWhitelisted(store, contractAddress, chainId)
      if (iswhitelisted) {
        const block = Number(event.blockNumber);

        const blockTimestamp = await getBlockTimestamp(client, store, event)

        const chain = await getChainOrCreate(store, chainId);
        const vault = await getVaultOrCreate(client, event, contractAddress, chain);
        const user = await getUserOrCreate(store, owner, blockTimestamp);

        const newTransaction = new VaultTransaction({
          block,
          hash: event.transactionHash,
          vault,
          sender,
          owner,
          transactionType: VaultTransactionEnum.Deposit.toString(),
          assets: assets.toString(),
          shares: shares.toString(),
          dateExecuted: blockTimestamp,
          chainId: chain.chainId,
          chain,
          vaultAddress: contractAddress,
          user
        });

        await newTransaction.save();
      }
    } catch (error) {
      logger.error(error);
    }
  };
