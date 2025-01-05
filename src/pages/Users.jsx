import { DataTable } from "@/components/ui/data-table";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const dummyUsers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
    {
        id: 3,
        name: "Robert Brown",
        email: "robert.brown@example.com",
        role: "User",
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "Moderator",
    },
];

const columns = [
    {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
    },
    {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
    },
    {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
    },
    {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className='flex space-x-2'>
                <button className='text-green-500 hover:text-green-700 flex items-center'>
                    <FaUserEdit className='mr-1' /> Edit
                </button>
                <button className='text-red-500 hover:text-red-700 flex items-center'>
                    <FaTrashAlt className='mr-1' /> Delete
                </button>
            </div>
        ),
    },
];

function Users() {
    return (
        <div className='p-4'>
            <Helmet>
                <title>Users - SwiftPOS</title>
            </Helmet>
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Manager</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Users</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-2xl font-semibold mb-4'>Data Users</h1>
            <DataTable columns={columns} data={dummyUsers} name={"User"} />
        </div>
    );
}

export default Users;
