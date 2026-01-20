import { instance } from "@/app/api/axios";
import { ICart } from "@/types/cart.types";
import { ISimpleFavoriteItem } from "@/types/favorites.types";

class FavoritesService {
    private _BASE_URL = "/favorites";

    async getCart() {
        return instance.get<ICart>(this._BASE_URL);
    }

    async toggleFavorites(productId: string) {
        return instance.post<ISimpleFavoriteItem>(this._BASE_URL, {
            productId,
        });
    }

    // async syncCart(items: any) {
    //     return instance.post(`${this._BASE_URL}/sync`, { items });
    // }
}

export default new FavoritesService();
