import { createColumnHelper } from "@tanstack/react-table";
import { StrategyReport } from "../../gql/graphql";
import { DateTime } from "luxon";

export const getStrategyReportColumns = () => {
    const columnHelper = createColumnHelper<StrategyReport>();

    const columns = [
        columnHelper.accessor("reportDate", {
            header: "Report date",
            cell: info => {
                return DateTime.fromSeconds(info.getValue()).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            }
        }),
        columnHelper.accessor("block", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("duration", {
            cell: info => {
                return DateTime.fromSeconds(info.getValue()).minute
            }
        }),
        columnHelper.accessor("allocBPS", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("allocated", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("debtPaid", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("gain", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("gains", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("loss", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("losses", {
            cell: info => info.getValue()
        })
    ];

    return columns;
}
