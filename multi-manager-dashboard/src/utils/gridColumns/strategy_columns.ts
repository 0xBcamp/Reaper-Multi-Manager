import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { Strategy } from "../../redux/slices/strategiesSlice";

export const getStrategyColumns = () => {
    const columnHelper = createColumnHelper<Strategy>();

    const columns = [
        columnHelper.accessor("dateAdded", {
            header: "Added",
            cell: info => {
                return DateTime.fromSeconds(info.getValue()).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
            }
        }),
        columnHelper.accessor("address", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("vault", {
            cell: info => {
                const vault = info.getValue();
                return vault.name
            }
        }),
        columnHelper.accessor("APR", {
            cell: info => {
                return info.getValue().toFixed(2);
            }
        }),
        columnHelper.accessor("actualAllocatedBPS", {
            header: "Actual BPS",
            cell: info => {
                return info.getValue();
            }
        }),
        columnHelper.accessor("optimumAllocation", {
            header: "Opt Alloc",
            cell: info => {
                return info.getValue();
            }
        }),
        columnHelper.accessor("optimumAllocationBPS", {
            header: "Actual Alloc BPS",
            cell: info => {
                return info.getValue();
            }
        }),
        // columnHelper.accessor("lastReport", {
        //     cell: info => {
        //         const lastReport = info.getValue();
        //         return info.getValue().toFixed(2);
        //     }
        // }),
        // columnHelper.accessor("allocated", {
        //     cell: info => info.getValue()
        // }),
        // columnHelper.accessor("debtPaid", {
        //     cell: info => info.getValue()
        // }),
        // columnHelper.accessor("gain", {
        //     cell: info => info.getValue()
        // }),
        // columnHelper.accessor("gains", {
        //     cell: info => info.getValue()
        // }),
        // columnHelper.accessor("loss", {
        //     cell: info => info.getValue()
        // }),
        // columnHelper.accessor("losses", {
        //     cell: info => info.getValue()
        // })
    ];

    return columns;
}
