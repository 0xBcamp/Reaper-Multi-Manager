import { createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { Vault } from "../../redux/slices/vaultsSlice";

export const getVaultsColumns = () => {
    const columnHelper = createColumnHelper<Vault>();

    const columns = [
        columnHelper.accessor("name", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("symbol", {
            cell: info => info.getValue()
        }),
        columnHelper.accessor("strategyCount", {
            header: "Strategies",
            cell: info => {
                return info.getValue();
            }
        }),
        columnHelper.accessor("APR", {
            cell: info => {
                return info.getValue().toFixed(2);
            }
        }),
    ];

    return columns;
}
