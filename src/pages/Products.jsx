import { DataTable } from "@/components/ui/data-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const dummyProducts = [
    {
        id: 1,
        name: "Nasi Goreng Spesial",
        category: "Makanan",
        price: 25000,
        stock: 50,
        rating: 4.7,
    },
    {
        id: 2,
        name: "Ayam Goreng Crispy",
        category: "Makanan",
        price: 20000,
        stock: 40,
        rating: 4.5,
    },
    {
        id: 3,
        name: "Sate Ayam Madura",
        category: "Makanan",
        price: 30000,
        stock: 30,
        rating: 4.8,
    },
    {
        id: 4,
        name: "Es Teh Manis",
        category: "Minuman",
        price: 5000,
        stock: 100,
        rating: 4.3,
    },
    {
        id: 5,
        name: "Jus Alpukat",
        category: "Minuman",
        price: 15000,
        stock: 25,
        rating: 4.6,
    },
    {
        id: 6,
        name: "Mie Ayam Bakso",
        category: "Makanan",
        price: 22000,
        stock: 35,
        rating: 4.7,
    },
    {
        id: 7,
        name: "Es Jeruk Segar",
        category: "Minuman",
        price: 10000,
        stock: 50,
        rating: 4.4,
    },
    {
        id: 8,
        name: "Rendang Sapi",
        category: "Makanan",
        price: 40000,
        stock: 20,
        rating: 4.9,
    },
    {
        id: 9,
        name: "Kopi Susu",
        category: "Minuman",
        price: 12000,
        stock: 70,
        rating: 4.5,
    },
    {
        id: 10,
        name: "Burger Daging Sapi",
        category: "Makanan",
        price: 35000,
        stock: 15,
        rating: 4.6,
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
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
    },
    {
        accessorKey: "price",
        header: "Price",
        enableSorting: true,
    },
    {
        accessorKey: "stock",
        header: "Stock",
        enableSorting: true,
    },
    {
        accessorKey: "rating",
        header: "Rating",
        enableSorting: true,
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <div className='flex space-x-2 justify-end'>
                <Button className='flex items-center text-forest-green hover:text-white bg-transparent hover:bg-forest-green'>
                    <FaEdit className='mr-1' /> Edit
                </Button>
                <Button className='flex items-center text-crimson-red hover:text-white bg-transparent hover:bg-crimson-red'>
                    <FaTrashAlt className='mr-1' /> Delete
                </Button>
            </div>
        ),
    },
];

function Products() {
    return (
        <div className='p-4'>
            <Helmet>
                <title>Products - SwiftPOS</title>
            </Helmet>
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Manager</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Products</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-2xl font-semibold mb-4'>Data Product</h1>
            <DataTable columns={columns} data={dummyProducts} name={"Product"} />
        </div>
    );
}

export default Products;
