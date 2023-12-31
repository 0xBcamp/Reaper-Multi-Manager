import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { VaultTransaction, VaultTransactionEnum } from "../../entities/VaultTransaction.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp, isVaultWhitelisted, getUserOrCreate } from "../helpers.ts";

export const withdrawHandler: EventHandlerFor<typeof VAULT_V2_ABI, "Withdraw"> =
  async (
    { event, logger, contract, store, client },
  ) => {
    try {
      const { sender, receiver, owner, assets, shares } = event.args;

      const contractAddress = event.address as string;
      const chainId = await client.getChainId();

      if (await isVaultWhitelisted(store, contractAddress, chainId)) {
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
          receiver,
          transactionType: VaultTransactionEnum.Withdraw.toString(),
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
