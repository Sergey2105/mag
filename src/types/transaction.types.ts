import { IOrder } from './order.types'

export type TransactionStatus =
	| 'pending'
	| 'waiting_for_capture'
	| 'succeeded'
	| 'canceled'
	| 'refunded'

export interface ITransaction {
	id: number
	createdAt: Date
	updatedAt: Date

	paymentId: string
	paymentMethod?: string
	amount: string
	status: TransactionStatus
	order?: IOrder
}
