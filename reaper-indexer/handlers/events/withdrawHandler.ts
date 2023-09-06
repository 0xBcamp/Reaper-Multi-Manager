import { Hex } from "npm:viem";
import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor, formatUnits } from "../../deps.ts";
import { Vault } from "../../entities/Vault.ts";
import { VaultTransaction, VaultTransactionEnum } from "../../entities/VaultTransaction.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp } from "../helpers.ts";

export const withdrawHandler: EventHandlerFor<typeof VAULT_V2_ABI, "Withdraw"> =
  async (
    { event, logger, contract, store, client },
  ) => {
    try {
      const { sender, receiver, owner, assets, shares } = event.args;

      const block = Number(event.blockNumber);

      const blockTimestamp = await getBlockTimestamp(client, store, event)

      const contractAddress = event.address as string;

      const chain = await getChainOrCreate(store, client);
      const vault = await getVaultOrCreate(client, event, contractAddress, chain);

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
        chain
      });

      newTransaction.save();
      logger.info(`withdrawal saved`);
    } catch (error) {
      logger.error(error);
    }
  };
