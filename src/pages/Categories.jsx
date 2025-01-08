import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
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
import { BiSolidFoodMenu } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "@/redux/category/categorySlice";

const categorySchema = z.object({
    kategoryName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
});

const CategoryForm = ({ categoryId, isEdit = false, onSave }) => {
    const { categories } = useSelector((state) => state.category);
    const [categoryData] = useState(() =>
        isEdit ? categories.find((cat) => cat.id === categoryId) : null
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            kategoryName: isEdit ? categoryData?.kategoryName || "" : "",
        },
    });

    useEffect(() => {
        if (isEdit && categoryData) {
            setValue("kategoryName", categoryData.kategoryName);
        }
    }, [categoryData, isEdit, setValue]);

    const onSubmit = (data) => {
        onSave?.(data);
        document.querySelector(".dialog-close-btn")?.click();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
                <div>
                    <label
                        htmlFor='kategoryName'
                        className='block text-sm font-semibold text-gray-700 mb-2'>
                        Name
                    </label>
                    <input
                        id='kategoryName'
                        type='text'
                        {...register("kategoryName")}
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${errors.kategoryName
                            ? "border-crimson-red focus:ring-crimson-red"
                            : "border-slate-300 focus:ring-midnight-blue"
                            }`}
                    />
                    {errors.kategoryName && (
                        <span className='text-crimson-red text-sm'>
                            {errors.kategoryName.message}
                        </span>
                    )}
                </div>
            </div>
            <div className='mt-6 flex justify-end space-x-4'>
                <DialogClose className='dialog-close-btn'>
                    <Button
                        type='button'
                        className='bg-champagne-gold text-white hover:bg-champagne-gold hover:opacity-80 transition duration-200 ease-in-out rounded-md px-6 py-3'>
                        Close
                    </Button>
                </DialogClose>
                <Button
                    type='submit'
                    className={
                        isEdit
                            ? "bg-forest-green text-white hover:bg-forest-green hover:opacity-80 transition duration-200 ease-in-out rounded-md px-6 py-3 flex items-center space-x-2"
                            : "bg-midnight-blue text-white hover:bg-midnight-blue hover:opacity-80 transition duration-200 ease-in-out rounded-md px-6 py-3 flex items-center space-x-2"
                    }>
                    <IoIosSave />
                    <span>{isEdit ? "Save Changes" : "Add Category"}</span>
                </Button>
            </div>
        </form>
    );
};

function Categories() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const [dataCategory, setDataCategory] = useState([]);

    const handleAddCategory = (category) => {
        dispatch(createCategory(category));
    };

    const handleEditCategory = (category) => {
        dispatch(updateCategory(category));
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories) {
            setDataCategory(categories);
        }
    }, [categories]);

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    const columns = [
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "kategoryName", header: "Name", enableSorting: true },
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
                            <CategoryForm
                                categoryId={row.original.id}
                                isEdit={true}
                                onSave={handleEditCategory}
                            />
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
                                <DialogClose className='dialog-close-btn'>
                                    <Button
                                        type='button'
                                        className='bg-champagne-gold text-white hover:bg-champagne-gold hover:opacity-80 transition duration-200 ease-in-out rounded-md px-6 py-3'>
                                        Close
                                    </Button>
                                </DialogClose>
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

    return (
        <div className='p-4'>
            <Toaster position='top-right' reverseOrder={false} />
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
            <div className='flex justify-end -mb-10'>
                <Dialog>
                    <DialogTrigger>
                        <Button className='px-4 py-2 bg-midnight-blue text-white rounded-md shadow-md flex items-center space-x-2 hover:bg-midnight-blue/80 transition duration-300'>
                            <BiSolidFoodMenu className='text-lg' />
                            <span>Add New Category</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                            <DialogDescription>
                                Please fill in the category details.
                            </DialogDescription>
                        </DialogHeader>
                        <CategoryForm isEdit={false} onSave={handleAddCategory} />
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={dataCategory} name={"Category"} />
        </div>
    );
}

export default Categories;
