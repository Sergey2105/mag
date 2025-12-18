import { instance } from "@/app/api/axios"

class PromoService {
	private _BASE_URL = '/promo'

	async checkPromo(promoCode: string) {
		if (!promoCode) return null

		return instance.get<null | number>(`${this._BASE_URL}/check/${promoCode}`)
	}
}

export default new PromoService()
