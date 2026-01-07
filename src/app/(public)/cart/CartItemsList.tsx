import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import { ISimpleCartItem } from "@/types/cart.types";
import { CartItem } from "./CartItem";

interface Props {
    cartItems: ISimpleCartItem[];
}

export function CartItemsList({ cartItems }: Props) {
    const remove = useRemoveFromCart();

    return (
        <div className="space-y-4">
            {cartItems.length ? cartItems.map((item) => <CartItem info={item} key={item.id} />) : <div className="text-center text-gray-500">Корзина пуста</div>}
        </div>
    );
}
