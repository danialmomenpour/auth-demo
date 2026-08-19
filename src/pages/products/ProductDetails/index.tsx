import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const productSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),

    price: z
        .number()
        .min(0, "Price must be greater than or equal to 0"),

    discountPercentage: z
        .number()
        .min(0)
        .max(100),

    stock: z
        .number()
        .int("Stock must be an integer")
        .min(0, "Stock cannot be negative"),

    brand: z
        .string()
        .min(1, "Brand is required"),

    category: z
        .string()
        .min(1, "Category is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    category: string;
};

const fetchProduct = async (id: string): Promise<Product> => {
    const response = await axios.get<Product>(
        `https://dummyjson.com/products/${id}`
    );

    return response.data;
};

const updateProduct = async ({
                                 id,
                                 data,
                             }: {
    id: string;
    data: ProductFormValues;
}): Promise<Product> => {
    const response = await axios.put<Product>(
        `https://dummyjson.com/products/${id}`,
        data
    );

    return response.data;
};

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id!),
        enabled: Boolean(id),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty,
        },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            discountPercentage: 0,
            stock: 0,
            brand: "",
            category: "",
        },
    });

    useEffect(() => {
        if (!product) return;

        reset({
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
        });
    }, [product, reset]);

    const updateMutation = useMutation({
        mutationFn: updateProduct,

        onSuccess: () => {
            alert("Product updated successfully!");

            navigate("/products");
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                    "Failed to update product."
                );
            } else {
                alert("Something went wrong.");
            }
        },
    });

    const onSubmit = (data: ProductFormValues) => {
        if (!id) return;

        updateMutation.mutate({
            id,
            data,
        });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-600">
                    Loading product...
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-red-600">
                    {error instanceof Error
                        ? error.message
                        : "Failed to load product."}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Edit Product
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            {...register("title")}
                            className={`w-full rounded-lg border px-3 py-2 outline-none transition
                                ${
                                errors.title
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            }`}
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            rows={4}
                            {...register("description")}
                            className={`w-full rounded-lg border px-3 py-2 outline-none transition
                                ${
                                errors.description
                                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            }`}
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label
                            htmlFor="price"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>

                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                            className={`w-full rounded-lg border px-3 py-2 outline-none transition
                                ${
                                errors.price
                                    ? "border-red-500"
                                    : "border-gray-300 focus:border-blue-500"
                            }`}
                        />

                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* Discount */}
                    <div>
                        <label
                            htmlFor="discountPercentage"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Discount Percentage
                        </label>

                        <input
                            id="discountPercentage"
                            type="number"
                            step="0.01"
                            {...register("discountPercentage", {
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.discountPercentage && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.discountPercentage.message}
                            </p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label
                            htmlFor="stock"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Stock
                        </label>

                        <input
                            id="stock"
                            type="number"
                            {...register("stock", {
                                valueAsNumber: true,
                            })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.stock && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.stock.message}
                            </p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label
                            htmlFor="brand"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Brand
                        </label>

                        <input
                            id="brand"
                            type="text"
                            {...register("brand")}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.brand && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.brand.message}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>

                        <input
                            id="category"
                            type="text"
                            {...register("category")}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={
                                !isDirty ||
                                updateMutation.isPending
                            }
                            className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {updateMutation.isPending
                                ? "Updating..."
                                : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductDetailsPage;