import { instance } from "@/app/api/axios";
import { ICart } from "@/types/cart.types";

class CartService {
    private _BASE_URL = "/cart";

    async getCart() {
        return instance.get<ICart>(this._BASE_URL);
    }

    async addToCart(productId: string, quantity: number) {
        return instance.post<ICart>(this._BASE_URL, {
            productId,
            quantity,
        });
    }

    async incrementInCart(cartItemId: string) {
        return instance.patch<ICart>(`${this._BASE_URL}/increment`, {
            cartItemId,
        });
    }
    async decrementInCart(cartItemId: string) {
        return instance.patch<ICart>(`${this._BASE_URL}/decrement`, {
            cartItemId,
        });
    }

    async removeFromCart(cartItemId: string) {
        return instance.delete<ICart>(this._BASE_URL, {
            data: {
                cartItemId,
            },
        });
    }

    async syncCart(items: any) {
        return instance.post(`${this._BASE_URL}/sync`, { items });
    }

    async normalizeGuestCart(dto: any) {
        return instance.post(`${this._BASE_URL}/normalize-guest`, dto);
    }
}

export default new CartService();
