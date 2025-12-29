import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import { ISimpleCartItem } from "@/types/cart.types";
import cn from "clsx";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface Props {
    cartItems: ISimpleCartItem[];
    onShowSecondItemModal: () => void;
}

export function CartItemsList({ cartItems, onShowSecondItemModal }: Props) {
    const remove = useRemoveFromCart();

    return (
        <div className="space-y-4">
            {cartItems.length ? (
                cartItems.map((item) => (
                    <div
                        key={item.id}
                        className={cn("flex items-center justify-between p-2 border border-gray-300 rounded-lg", {
                            "bg-linear-to-r from-blue-200 to-red-200": item.asSecondItem,
                        })}
                    >
                        <div className="flex items-center">
                            <Image src={item.product.images[0]} alt={item.product.name} width={50} height={50} className="rounded mr-3" />
                            <div>
                                <div className="font-semibold flex items-center gap-2.5">
                                    {item.product.name}
                                    {item.product.isHasSecondDiscount && (
                                        <button className="bg-blue-500 text-white text-xxs font-medium px-2 py-0.5 rounded" onClick={onShowSecondItemModal}>
                                            2nd discount
                                        </button>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {item.asSecondItem ? (
                                        <>
                                            <span className="line-through">${item.product.price.toFixed(2)}</span>
                                            <span className="text-green-600 ml-2">${item.product.discountPrice.toFixed(2)}</span>
                                        </>
                                    ) : (
                                        <>${item.product.price.toFixed(2)}</>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="text-sm font-medium">Qty: {item.quantity}</div>
                            <button onClick={() => remove.mutate(item.id)} className="hover:text-red-700 transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">No items in your cart</div>
            )}
        </div>
    );
}
