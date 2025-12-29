import { IUser } from '@/types/user.types'
import { ICart } from './cart.types'
import { ITransaction } from '@/types/transaction.types'

export interface IOrder {
	id: string
	createdAt: string
	updatedAt: string

	user?: IUser

	cart: ICart
	total: number
	promoCode?: {
		code: string
		discount: number
	}

	status: OrderStatus

	transaction?: ITransaction
}

export interface CreateOrderDto {
	promoCode?: string
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled'
