"use client";

import { useState } from "react";
import { OtpInput } from "./inputs/OtpInput";
import { PhoneNumberInput } from "./inputs/PhoneNumberInput";
import { usePhoneAuth } from "./usePhoneAuth";
import { Dialog } from "@/components/ui/dialog";

interface PhoneAuthModalProps {
    isOpen: boolean;
    type: "sms" | "whatsapp";
    onClose: () => void;
}

export function PhoneAuthModal({ isOpen, type, onClose }: PhoneAuthModalProps) {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [step, setStep] = useState<"phone" | "otp">("phone");

    const { sendCode, verifyCode, isLoading } = usePhoneAuth(type);

    const handleSendCode = async () => {
        if (!phone) return;
        const success = await sendCode(phone);
        if (success) setStep("otp");
    };

    const handleVerifyCode = async () => {
        const code = otp.join("");
        if (code.length < 4) return;
        const success = await verifyCode({ phone, code });
        if (success) onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <h2 className="font-semibold mb-4 text-center text-white">
                {step === "phone" ? `Enter your ${type === "sms" ? "phone" : "WhatsApp"} number` : "Enter verification code"}
            </h2>

            {step === "phone" ? (
                <PhoneNumberInput type={type} phone={phone} setPhone={setPhone} onSubmit={handleSendCode} isLoading={isLoading} />
            ) : (
                <OtpInput type={type} otp={otp} setOtp={setOtp} onComplete={handleVerifyCode} />
            )}
        </Dialog>
    );
}
