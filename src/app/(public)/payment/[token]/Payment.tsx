'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Payment() {
	const { token } = useParams<{ token: string }>()

	const [isPaymentFormLoading, setIsPaymentFormLoading] = useState(true)
	const [isLoadedScript, setIsLoadedScript] = useState(false)

	useEffect(() => {
		const scriptTag = document.createElement('script')
		scriptTag.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js'
		scriptTag.addEventListener('load', () => {
			setIsLoadedScript(true)
		})
		document.body.appendChild(scriptTag)
	}, [])

	useEffect(() => {
		if (!isLoadedScript) return
		if (!token) return

		const checkout = new (window as any).YooMoneyCheckoutWidget({
			confirmation_token: token,
			return_url: `http://localhost:3000/thanks`,

			error_callback(error: string) {
				console.error(error)
			}
		})

		setIsPaymentFormLoading(false)
		checkout.render('payment-form')
	}, [isLoadedScript, token])

	return (
		<>
			{isPaymentFormLoading && <div>Loading...</div>}
			<div id="payment-form" />
		</>
	)
}
