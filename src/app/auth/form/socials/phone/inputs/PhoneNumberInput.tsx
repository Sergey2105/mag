"use client";

import { LoaderCircleIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface PhoneNumberInputProps {
    phone: string;
    setPhone: (phone: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    type: "sms" | "whatsapp";
}

export function PhoneNumberInput({ phone, setPhone, onSubmit, isLoading, type }: PhoneNumberInputProps) {
    return (
        <div className="space-y-5">
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 123 456 7890"
                className={twMerge(
                    "w-full p-3 border border-gray-500 rounded bg-transparent text-white text-lg focus:outline-none",
                    type === "whatsapp" ? "focus:border-primary" : "focus:border-indigo-500",
                )}
            />

            <button
                onClick={onSubmit}
                disabled={isLoading || !phone}
                className={twMerge(
                    "w-full py-2 text-white font-semibold rounded transition",
                    isLoading && "opacity-75 cursor-not-allowed",
                    type === "whatsapp" ? "bg-primary" : "bg-indigo-500",
                )}
            >
                {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Send Code"}
            </button>
        </div>
    );
}
