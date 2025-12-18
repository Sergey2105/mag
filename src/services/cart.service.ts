import { instance } from '@/app/api/axios'
import { ICart } from '@/types/cart.types'

class CartService {
	private _BASE_URL = '/cart'

	async getCart() {
		return instance.get<ICart>(this._BASE_URL)
	}

	async addToCart(productId: string, quantity: number, asSecondItem?: boolean) {
		return instance.post<ICart>(this._BASE_URL, {
			productId,
			quantity,
			asSecondItem
		})
	}

	async removeFromCart(cartItemId: string) {
		return instance.delete<ICart>(this._BASE_URL, {
			data: {
				cartItemId
			}
		})
	}
}

export default new CartService()
