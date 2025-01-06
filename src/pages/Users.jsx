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
import { Button } from "@/components/ui/button";

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
        header: "",
        cell: ({ row }) => (
            <div className='flex space-x-2 justify-end'>
                <Button className='flex items-center text-forest-green hover:text-white bg-transparent hover:bg-forest-green'>
                    <FaUserEdit className='mr-1' /> Edit
                </Button>
                <Button className='flex items-center text-crimson-red hover:text-white bg-transparent hover:bg-crimson-red'>
                    <FaTrashAlt className='mr-1' /> Delete
                </Button>
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
