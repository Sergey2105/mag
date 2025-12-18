import { instance } from '@/app/api/axios'
import { CreateOrderDto, IOrder } from '@/types/order.types'

class OrderService {
	private _BASE_URL = '/orders'

	async getAll() {
		return instance.get<IOrder[]>(this._BASE_URL)
	}

	async createOrder(createOrderDto: CreateOrderDto) {
		return instance.post<IOrder>(`${this._BASE_URL}/create`, createOrderDto)
	}
}

export default new OrderService()
