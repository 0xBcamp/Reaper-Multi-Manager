import { createColumnHelper } from "@tanstack/react-table";
import { DateTime, Duration } from "luxon";
import { StrategyReport } from "../../redux/slices/strategiesSlice";
import { Vault } from "../../redux/slices/vaultsSlice";
import { ethers } from "ethers";

export const getStrategyReportColumns = (vault: Vault) => {
    const columnHelper = createColumnHelper<StrategyReport>();

    const columns = [
        columnHelper.accessor("reportDate", {
            header: "Report date",
            cell: info => {
                const date = DateTime.fromSeconds(info.getValue());
                return date.toFormat('dd LLL yy HH:mm');
            }
        }),
        columnHelper.accessor("duration", {
            cell: info => {
                const duration = Duration.fromObject({ seconds: info.getValue() });
                return duration.toFormat('hh:mm:ss');
            }
        }),
        columnHelper.accessor("allocBPS", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("allocated", {
            cell: info => {
                const units = parseFloat(ethers.formatUnits(info.getValue(), vault.decimals));
                const multipliedValue = units * vault.tokenDto.usd;
                const value = `$${multipliedValue.toFixed(2).toLocaleString()}`;
                return value;
            }
        }),
        columnHelper.accessor("debtPaid", {
            cell: info => {
                const units = parseFloat(ethers.formatUnits(info.getValue(), vault.decimals));
                const multipliedValue = units * vault.tokenDto.usd;
                const value = `$${multipliedValue.toFixed(2).toLocaleString()}`;
                return value;
            }
        }),
        columnHelper.accessor("gain", {
            cell: info => {
                const units = parseFloat(ethers.formatUnits(info.getValue(), vault.decimals));
                const multipliedValue = units * vault.tokenDto.usd;
                const value = `$${multipliedValue.toFixed(2).toLocaleString()}`;
                return value;
            }
        }),
        columnHelper.accessor("gains", {
            cell: info => {
                const units = parseFloat(ethers.formatUnits(info.getValue(), vault.decimals));
                const multipliedValue = units * vault.tokenDto.usd;
                const value = `$${multipliedValue.toFixed(2).toLocaleString()}`;
                return value;
            }
        }),
        columnHelper.accessor("loss", {
            cell: info => {
                const units = parseFloat(ethers.formatUnits(info.getValue(), vault.decimals));
                const multipliedValue = units * vault.tokenDto.usd;
                const value = `$${multipliedValue.toFixed(2).toLocaleString()}`;
                return value;
            }
        }),
        columnHelper.accessor("losses", {
            cell: info => {
                const units = parseFloat(ethers.formatUnits(info.getValue(), vault.decimals));
                const multipliedValue = units * vault.tokenDto.usd;
                const value = `$${multipliedValue.toFixed(2).toLocaleString()}`;
                return value;
            }
        }),
        columnHelper.accessor("apr", {
            header: "APR",
            cell: info => info.getValue().toFixed(2)
        })
    ];

    return columns;
}
