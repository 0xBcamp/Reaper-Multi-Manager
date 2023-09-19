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
      const chainId = await client.getChainId();

      if (await isVaultWhitelisted(store, vaultAddress, chainId)) {
        const block = Number(event.blockNumber);

        const blockTimestamp = await getBlockTimestamp(client, store, event)

        const chain = await getChainOrCreate(store, chainId);

        const [vault, strategy] = await Promise.all([
          getVaultOrCreate(client, event, vaultAddress, chain),
          getStrategy(vaultAddress, strategyAddress)
        ])

        if (strategy) {
          const prevReport = await StrategyReport.findOne({vaultAddress: vault.address.toString(), strategyAddress: strategy.address.toString()}).sort({reportDate: -1});

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
            allocBPS: allocBPS.toString(),
            duration: prevReport ? blockTimestamp - prevReport.reportDate : blockTimestamp - strategy.dateAdded!,
            chainId
          });

          const lastReport = await newReport.save();

          strategy.lastReport = lastReport;
          await strategy.save();
        }
      }
    } catch (error) {
      logger.error(error);
    }
  };
