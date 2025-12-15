'use client'

import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface OtpInputProps {
	otp: string[]
	setOtp: (otp: string[]) => void
	onComplete: () => void
	type: 'sms' | 'whatsapp'
}

export function OtpInput({ otp, setOtp, onComplete, type }: OtpInputProps) {
	const otpRefs = useRef<(HTMLInputElement | null)[]>([])
	const [isCompleted, setIsCompleted] = useState(false)

	const handleOtpChange = (index: number, value: string) => {
		if (!/^\d?$/.test(value)) return

		const newOtp = [...otp]
		newOtp[index] = value
		setOtp(newOtp)

		if (value && index < otp.length - 1) {
			otpRefs.current[index + 1]?.focus()
		}
	}

	const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			otpRefs.current[index - 1]?.focus()
		}
	}

	useEffect(() => {
		if (otp.every(digit => digit !== '') && otp.length === 4 && !isCompleted) {
			setIsCompleted(true)
			onComplete()
		}
	}, [otp, isCompleted, onComplete])

	return (
		<div className="flex items-center gap-4 justify-center">
			{otp.map((digit, i) => (
				<input
					key={i}
					type="text"
					maxLength={1}
					ref={el => {
						otpRefs.current[i] = el
					}}
					value={digit}
					onChange={e => handleOtpChange(i, e.target.value)}
					onKeyDown={e => handleOtpKeyDown(i, e)}
					className={twMerge(
						'w-14 h-14 text-center border border-gray-500 rounded bg-transparent text-white !text-3xl font-semibold focus:outline-none',
						type === 'whatsapp'
							? 'focus:border-primary'
							: 'focus:border-indigo-500'
					)}
				/>
			))}
		</div>
	)
}
