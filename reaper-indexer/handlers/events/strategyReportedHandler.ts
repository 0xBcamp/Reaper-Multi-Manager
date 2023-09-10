import { VAULT_V2_ABI } from "../../abi/vaultV2Abi.ts";
import { EventHandlerFor } from "../../deps.ts";
import { getChainOrCreate, getVaultOrCreate, getBlockTimestamp, isVaultWhitelisted, getStrategy } from "../helpers.ts";
import { StrategyReport } from "../../entities/StrategyReport.ts";

export const strategyReportedHandler: EventHandlerFor<typeof VAULT_V2_ABI, "StrategyReported"> =
  async (
    { event, logger, contract, store, client },
  ) => {
    try {

      const { strategy, gain, loss, debtPaid, gains, losses, allocated, allocationAdded, allocBPS } = event.args;

      const vaultAddress = event.address as string;
      const strategyAddress = strategy as string;

      if (await isVaultWhitelisted(store, vaultAddress)) {
        const block = Number(event.blockNumber);

        const blockTimestamp = await getBlockTimestamp(client, store, event)

        const chain = await getChainOrCreate(store, client);

        const [vault, strategy] = await Promise.all([
          getVaultOrCreate(client, event, vaultAddress, chain, blockTimestamp),
          getStrategy(vaultAddress, strategyAddress)
        ])

        if (strategy) {
          const newReport = new StrategyReport({
            block,
            hash: event.transactionHash,
            reportDate: blockTimestamp,
            strategyAddress,
            strategy,
            vaultAddress,
            vault,
            gain: gain.toString(),
            loss: loss.toString(),
            debtPaid: debtPaid.toString(),
            gains: gains.toString(),
            losses: losses.toString(),
            allocated: allocated.toString(),
            allocationAdded: allocationAdded.toString(),
            allocBPS: allocBPS.toString()
          });

          await newReport.save();
        }
      }
    } catch (error) {
      logger.error(error);
    }
  };
