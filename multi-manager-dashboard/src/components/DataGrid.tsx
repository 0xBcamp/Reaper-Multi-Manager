import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
type Props = {
    data: any[];
    columns: ColumnDef<any, any>[];
    heading: string;
}

function DataGrid({ data, columns, heading }: Props) {
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div className="bg-white shadow-sm overflow-hidden w-full border-gray-200 border">
            <div className="flex justify-between items-center p-2 pl-5">
                <span className="text-gray-800 font-bold">{heading}</span>
                {/* <div className="flex items-center border bg-white focus-within:border-blue-500 hover:border-blue-200 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <img src={`${process.env.PUBLIC_URL}/icons/search-50.png`} alt="Search icon" className="h-3 w-3 text-gray-200" />
                    </div>

                    <input
                        placeholder="Search"
                        className="flex-1 py-2 px-10 text-sm bg-transparent outline-none text-gray-500 pl-9" // `pl-7` is used to give space for the icon
                    />
                </div> */}
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end items-center p-4">
                <div className="flex flex-row">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-2 rounded-md bg-white hover:bg-gray-100"
                    >
                        <img src={`${process.env.PUBLIC_URL}/icons/first-1-50.png`} alt="Search icon" className="h-3 w-3 text-gray-200" />
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="mx-2 px-3 py-2 rounded-md bg-white hover:bg-gray-100"
                    >
                        <img src={`${process.env.PUBLIC_URL}/icons/back-30.png`} alt="Search icon" className="h-3 w-3 text-gray-200" />
                    </button>

                    <div className='flex items-center text-gray-500 text-xs'>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</div>

                    <button
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                        className="mx-2 px-3 py-2 bg-white hover:bg-gray-100"
                    >
                        <img src={`${process.env.PUBLIC_URL}/icons/next-page-50.png`} alt="Search icon" className="h-3 w-3 text-gray-200" />
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-2 rounded-md bg-white hover:bg-gray-100"
                    >
                        <img src={`${process.env.PUBLIC_URL}/icons/last-1-50.png`} alt="Search icon" className="h-3 w-3 text-gray-200" />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DataGrid