import { VAULT_V2_ABI } from "./abi/vaultV2Abi.ts";
import { snaphotVaultHandler } from "./blockHandlers/snaphotVaultHandler.ts";
import { Manifest } from "./deps.ts";
import { Chain } from "./entities/Chain.ts";
import { Strategy } from "./entities/Strategy.ts";
import { StrategyReport } from "./entities/StrategyReport.ts";
import { Vault } from "./entities/Vault.ts";
import { VaultSnapshot } from "./entities/VaultSnapshot.ts";
import { VaultTransaction } from "./entities/VaultTransaction.ts";
import { depositHandler } from "./handlers/events/depositHandler.ts";
import { strategyAddedHandler } from "./handlers/events/strategyAddedHandler.ts";
import { strategyReportedHandler } from "./handlers/events/strategyReportedHandler.ts";
import { strategyRevokedHandler } from "./handlers/events/strategyRevokedHandler.ts";
import { withdrawHandler } from "./handlers/events/withdrawHandler.ts";

const manifest = new Manifest("Reaper");

manifest
  .addEntities([Chain, Vault, Strategy, StrategyReport, VaultTransaction, VaultSnapshot])
  .addChain("optimism", (chain) =>
    chain
      .setOptions({ blockRange: 400n, })
      .addContract({
        name: "OP - MultiStrategy",
        abi: VAULT_V2_ABI,
        sources: { '*': 97393549n },
        eventHandlers: {
          "Deposit": depositHandler,
          "StrategyAdded": strategyAddedHandler,
          "StrategyRevoked": strategyRevokedHandler,
          "Withdraw": withdrawHandler,
          "StrategyReported": strategyReportedHandler,
        },
      })
      .addBlockHandler({
        blockInterval: 200,
        startBlockHeight: BigInt(97390509),
        handler: snaphotVaultHandler,
      })
  )
  .addChain("fantom", (chain) =>
    chain
      .setOptions({ blockRange: 400n, })
      .addContract({
        name: "Fantom - MultiStrategy",
        abi: VAULT_V2_ABI,
        sources: { "*": 59733460n },
        eventHandlers: {
          "Deposit": depositHandler,
          "StrategyAdded": strategyAddedHandler,
          "StrategyRevoked": strategyRevokedHandler,
          "Withdraw": withdrawHandler,
          "StrategyReported": strategyReportedHandler,
        },
      })
      .addBlockHandler({
        blockInterval: 200,
        startBlockHeight: BigInt(59733460n),
        handler: snaphotVaultHandler,
      })
  )
  .addChain("arbitrum", (chain) =>
    chain
      .setOptions({ blockRange: 400n, })
      .addContract({
        name: "Arbitrum - MultiStrategy",
        abi: VAULT_V2_ABI,
        sources: { '*': 103500000n },
        eventHandlers: {
          "Deposit": depositHandler,
          "StrategyAdded": strategyAddedHandler,
          "StrategyRevoked": strategyRevokedHandler,
          "Withdraw": withdrawHandler,
          "StrategyReported": strategyReportedHandler,
        },
      })
      .addBlockHandler({
        blockInterval: 200,
        startBlockHeight: BigInt(103500000),
        handler: snaphotVaultHandler,
      })
  );

export default manifest.build();
