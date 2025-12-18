import { instance } from '@/app/api/axios'
import { CreateOrderDto } from '@/types/order.types'

class PaymentService {
	async checkout(createOrderDto: CreateOrderDto) {
		const response = await instance.post<{ confirmationToken: string }>(
			`/transactions/checkout`,
			createOrderDto
		)

		return response
	}
}

export default new PaymentService()
