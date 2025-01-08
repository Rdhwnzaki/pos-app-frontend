import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";

export function DataTable({ columns, data, name }) {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [sorting, setSorting] = React.useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // const getIconForPage = (pageName) => {
    //     switch (pageName) {
    //         case "Product":
    //             return IoFastFood;
    //         case "User":
    //             return FaUser;
    //         case "Category":
    //             return BiSolidFoodMenu;
    //         default:
    //             return FaSearch;
    //     }
    // };

    return (
        <div className='space-y-6'>
            <div className='flex justify-between items-center'>
                <div className='relative w-1/3'>
                    <span className='absolute inset-y-0 left-3 flex items-center text-gray-500'>
                        <FaSearch />
                    </span>
                    <input
                        type='text'
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder={`Search ${name}...`}
                        className='w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-midnight-blue focus:outline-none'
                    />
                </div>
            </div>

            <div className='overflow-x-auto border rounded-lg shadow-md bg-white'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-midnight-blue text-white'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider cursor-pointer select-none hover:bg-midnight-blue/80'
                                        onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {header.column.getIsSorted() === "asc" ? (
                                            <FaArrowUp className='inline ml-1' />
                                        ) : header.column.getIsSorted() === "desc" ? (
                                            <FaArrowDown className='inline ml-1' />
                                        ) : null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className='hover:bg-gray-100 transition-colors duration-200'>
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className='px-6 py-4 text-center text-sm text-gray-500'>
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-between items-center mt-4'>
                <button
                    className='px-4 py-2 bg-champagne-gold text-white rounded-md shadow-md hover:bg-champagne-gold/80 transition duration-300'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>

                <span className='text-sm text-gray-600'>
                    Page{" "}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>

                <button
                    className='px-4 py-2 bg-champagne-gold text-white rounded-md shadow-md hover:bg-champagne-gold/80 transition duration-300'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    Next
                </button>
            </div>

            <div className='flex justify-end mt-2'>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className='border rounded-md px-3 py-2 bg-champagne-gold text-white'>
                    {[5, 10, 20, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
