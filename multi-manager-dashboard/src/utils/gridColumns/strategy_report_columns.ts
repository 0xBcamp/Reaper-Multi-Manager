import { createColumnHelper } from "@tanstack/react-table";
import { DateTime, Duration } from "luxon";
import { StrategyReport } from "../../redux/slices/strategiesSlice";

export const getStrategyReportColumns = () => {
    const columnHelper = createColumnHelper<StrategyReport>();

    const columns = [
        // columnHelper.accessor("reportDate", {
        //     header: "Report date",
        //     cell: info => {
        //         return DateTime.fromSeconds(info.getValue()).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
        //     }
        // }),
        columnHelper.accessor("reportDate", {
            header: "Report date",
            cell: info => {
                const date = DateTime.fromSeconds(info.getValue());
                return date.toFormat('dd LLL yy HH:mm');
            }
        }),
        // columnHelper.accessor("block", {
        //     cell: info => info.getValue()
        // }),
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
        }),
        columnHelper.accessor("apr", {
            header: "APR",
            cell: info => info.getValue().toFixed(2)
        })
    ];

    return columns;
}
