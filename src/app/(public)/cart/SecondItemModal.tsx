import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/useAddToCart";
import { IProduct } from "@/types/product.interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
    notInCartProducts: IProduct[];
    setIsShowSecondItemModal: Dispatch<SetStateAction<boolean>>;
}

export function SecondItemModal({ notInCartProducts, setIsShowSecondItemModal }: Props) {
    const add = useAddToCart();

    const onClose = () => setIsShowSecondItemModal(false);

    return (
        <div className="fixed inset-0 flex items-center z-[51] justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
            <div className="relative bg-white p-4 rounded-lg w-sm z-10">
                <h2 className="text-lg text-center leading-snug font-bold mb-4">Choose second item</h2>
                <div className="space-y-3 max-h-72 overflow-auto">
                    {notInCartProducts.map((product) => (
                        <div key={product.id} className="flex justify-between items-center border p-2 rounded">
                            <div className="flex items-center gap-3">
                                <Image src={product.images[0]} alt={product.name} width={50} height={50} className="rounded" />

                                <div>
                                    <h2 className="text-sm font-semibold text-primary">{product.name}</h2>

                                    <div className="line-through text-xs text-gray-400">${product.price.toFixed(2)}</div>
                                    <div className="text-green-600 text-xs font-semibold">${product.discountPrice.toFixed(2)}</div>
                                </div>
                            </div>
                            <Button
                                className="m-0"
                                onClick={() => {
                                    add.mutate({
                                        product,
                                        quantity: 1,
                                        asSecondItem: true,
                                    });
                                    onClose();
                                }}
                            >
                                Add
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <Button className="w-full" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
