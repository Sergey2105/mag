import type { Metadata } from 'next'
import { Payment } from './Payment'

export const metadata: Metadata = {
	title: 'Payment'
}

export default function PaymentPage() {
	return <Payment />
}
