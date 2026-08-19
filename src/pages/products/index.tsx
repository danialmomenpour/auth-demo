import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import axios from "../../api/axios.ts";
import {CanAccess} from "../../components/auth/CanAccess/CanAccess.tsx";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
};

type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

const fetchProducts = async (): Promise<ProductsResponse> => {
    try {
        const response = await axios.get<ProductsResponse>("/products");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
};

const ProductsPage = () => {
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    const handleEdit = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <p className="text-gray-500">Loading products...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg bg-red-50 p-6 text-red-600">
                <p className="font-medium">Failed to load products.</p>
                <p className="mt-1 text-sm">
                    {error instanceof Error
                        ? error.message
                        : "Something went wrong."}
                </p>
            </div>
        );
    }

    return (
        <section className="">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Products
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your products
                </p>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-8 m-8">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-225 text-left">
                        <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Product
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Price
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Rating
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                Stock
                            </th>

                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                        {data?.products.map((product) => (
                            <tr
                                key={product.id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="h-14 w-14 rounded-lg object-cover"
                                        />

                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {product.title}
                                            </p>

                                            <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    ${product.price}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-600">
                                    ⭐ {product.rating}
                                </td>

                                <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                                product.stock > 0
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {product.stock > 0
                                                ? `${product.stock} in stock`
                                                : "Out of stock"}
                                        </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">

                                        <CanAccess permission="products:update">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(product.id)
                                                }
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                Edit
                                            </button>
                                        </CanAccess>


                                        <CanAccess permission="products:delete">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    console.log(
                                                        "Delete product:",
                                                        product.id
                                                    )
                                                }
                                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            >
                                                Delete
                                            </button>
                                        </CanAccess>


                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ProductsPage;
