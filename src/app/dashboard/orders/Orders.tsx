"use client";

import orderService from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

export function Orders() {
    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => orderService.getAll(),
    });

    console.log(data);

    return (
        <div className="wrapper">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Orders</h1>

            {isLoading && <div className="text-center">Loading...</div>}

            <div className="space-y-4">
                {data?.data.length ? (
                    data.data.map((order) => (
                        <div key={order.id} className="p-4 border border-gray-300 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-lg font-semibold">Order ID: {order.id.slice(0, 6)}</div>
                                <div
                                    className={`px-2 py-1 text-sm rounded ${
                                        order.status === "completed"
                                            ? "bg-green-500 text-white"
                                            : order.status === "pending"
                                              ? "bg-yellow-500 text-white"
                                              : order.status === "processing"
                                                ? "bg-blue-500 text-white"
                                                : "bg-red-500 text-white"
                                    }`}
                                >
                                    {order.status}
                                </div>
                            </div>
                            <div className="text-gray-500 mb-2">
                                Created At:{" "}
                                {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "2-digit",
                                })}
                            </div>
                            <div className="space-y-3">
                                {order.cart.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <img src={item.product?.images[0]} alt={item.product?.name} className="w-14 h-14 rounded mr-3 object-cover" />
                                            <div>
                                                <div className="font-semibold">{item.product?.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    <>${item.product.price.toFixed(2)}</>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">Qty: {item.quantity}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex justify-between">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No orders found</div>
                )}
            </div>
        </div>
    );
}
