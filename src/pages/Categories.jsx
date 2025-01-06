import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { Helmet } from "react-helmet";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
    description: z
        .string()
        .min(5, { message: "Description must be at least 5 characters long" }),
});

const dummyCategories = [
    {
        id: 1,
        name: "Makanan Berat",
        description: "Makanan utama yang mengenyangkan seperti nasi dan lauk-pauk.",
    },
    {
        id: 2,
        name: "Makanan Ringan",
        description:
            "Cemilan atau makanan kecil seperti keripik, kue, atau gorengan.",
    },
    {
        id: 3,
        name: "Minuman Dingin",
        description: "Minuman menyegarkan seperti es teh, jus, dan es campur.",
    },
    {
        id: 4,
        name: "Minuman Hangat",
        description:
            "Minuman yang cocok untuk cuaca dingin seperti teh, kopi, dan coklat panas.",
    },
    {
        id: 5,
        name: "Dessert",
        description: "Hidangan penutup seperti es krim, puding, atau kue manis.",
    },
    {
        id: 6,
        name: "Masakan Tradisional",
        description: "Makanan khas daerah seperti rendang, sate, atau nasi uduk.",
    },
    {
        id: 7,
        name: "Fast Food",
        description:
            "Makanan cepat saji seperti burger, pizza, atau fried chicken.",
    },
    {
        id: 8,
        name: "Seafood",
        description:
            "Makanan berbahan dasar hasil laut seperti ikan, udang, atau cumi.",
    },
    {
        id: 9,
        name: "Vegetarian",
        description: "Makanan sehat tanpa daging, berbahan dasar sayur dan buah.",
    },
    {
        id: 10,
        name: "Bakery",
        description: "Roti, kue, dan pastry untuk berbagai kesempatan.",
    },
];

const columns = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
    { accessorKey: "description", header: "Description", enableSorting: true },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => (
            <div className='flex space-x-2 justify-end'>
                <Dialog>
                    <DialogTrigger>
                        <Button className='flex items-center text-forest-green hover:text-white bg-transparent hover:bg-forest-green'>
                            <FaEdit className='mr-1' /> Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                                Please update the category details.
                            </DialogDescription>
                        </DialogHeader>
                        <EditCategoryForm categoryId={row.original.id} />
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger>
                        <Button className='flex items-center text-crimson-red hover:text-white bg-transparent hover:bg-crimson-red transition-colors duration-200 ease-in-out'>
                            <FaTrashAlt className='mr-1' /> Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-lg p-6 bg-white rounded-lg shadow-lg'>
                        <DialogHeader>
                            <DialogTitle className='text-2xl font-semibold text-gray-800'>
                                Confirm Deletion
                            </DialogTitle>
                            <DialogDescription className='text-sm text-gray-600'>
                                Are you sure you want to delete this category? This action
                                cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <div className='mt-6 space-x-4 flex justify-end'>
                            <Button
                                type='button'
                                className='bg-champagne-gold text-white hover:bg-champagne-gold hover:opacity-75 transition-all duration-200 ease-in-out rounded-lg shadow-sm px-6 py-2'>
                                <DialogClose className='dialog-close-btn'>Cancel</DialogClose>
                            </Button>
                            <Button
                                type='button'
                                className='bg-crimson-red text-white hover:bg-crimson-red hover:opacity-75 transition-all duration-200 ease-in-out rounded-lg shadow-sm px-6 py-2'
                                onClick={() => handleDelete(row.original.id)}>
                                <FaTrashAlt className='mr-2' /> Confirm Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        ),
    },
];

const EditCategoryForm = ({ categoryId }) => {
    const [categoryData, setCategoryData] = useState(() =>
        dummyCategories.find((cat) => cat.id === categoryId)
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: categoryData?.name || "",
            description: categoryData?.description || "",
        },
    });

    useEffect(() => {
        setCategoryData(dummyCategories.find((cat) => cat.id === categoryId));
    }, [categoryId]);

    useEffect(() => {
        if (categoryData) {
            setValue("name", categoryData.name);
            setValue("description", categoryData.description);
        }
    }, [categoryData, setValue]);

    const onSubmit = (data) => {
        console.log("Updated Category:", data);
        document.querySelector(".dialog-close-btn")?.click();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
                <div>
                    <label
                        htmlFor='name'
                        className='block text-sm font-semibold text-gray-700 mb-2'>
                        Name
                    </label>
                    <input
                        id='name'
                        type='text'
                        {...register("name")}
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.name
                                ? "border-crimson-red focus:ring-crimson-red"
                                : "border-slate-300 focus:ring-midnight-blue"
                            }`}
                    />
                    {errors.name && (
                        <span className='text-crimson-red text-sm'>
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='block text-sm font-semibold text-gray-700 mb-2'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        {...register("description")}
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.description
                                ? "border-crimson-red focus:ring-crimson-red"
                                : "border-slate-300 focus:ring-midnight-blue"
                            }`}
                    />
                    {errors.description && (
                        <span className='text-crimson-red text-sm'>
                            {errors.description.message}
                        </span>
                    )}
                </div>
            </div>

            <div className='mt-6 flex justify-end space-x-4'>
                <Button
                    type='button'
                    className='bg-champagne-gold text-white hover:bg-champagne-gold hover:opacity-80 transition duration-200 ease-in-out rounded-md px-6 py-3'>
                    <DialogClose className='dialog-close-btn'>Cancel</DialogClose>
                </Button>

                <Button
                    type='submit'
                    className='bg-forest-green text-white hover:bg-forest-green hover:opacity-80 transition duration-200 ease-in-out rounded-md px-6 py-3 flex items-center space-x-2'>
                    <IoIosSave />
                    <span>Save Changes</span>
                </Button>
            </div>
        </form>
    );
};

const handleDelete = (id) => {
    console.log("Deleting category with ID:", id);
    document.querySelector(".dialog-close-btn")?.click();
};

function Categories() {
    return (
        <div className='p-4'>
            <Helmet>
                <title>Categories - SwiftPOS</title>
            </Helmet>
            <Breadcrumb className='mb-8'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Manager</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Categories</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className='text-2xl font-semibold mb-4'>Data Category</h1>
            <DataTable columns={columns} data={dummyCategories} name={"Category"} />
        </div>
    );
}

export default Categories;
