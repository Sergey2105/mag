import paymentService from '@/services/payment.service'
import { CreateOrderDto } from '@/types/order.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useCheckout(dto: CreateOrderDto) {
	const router = useRouter()

	const { mutate: checkout, isPending } = useMutation({
		mutationKey: ['checkout'],
		mutationFn: () => paymentService.checkout(dto),
		onSuccess(data) {
			const token = data.data.confirmationToken

			if (token) {
				router.push(`/payment/${token}`)
			}
		}
	})

	return {
		checkout,
		isPending
	}
}
