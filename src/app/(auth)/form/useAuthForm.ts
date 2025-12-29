"use client";

import { PUBLIC_PAGES } from "@/constants/routes";
import authService from "@/services/auth/auth.service";
import { IFormData } from "@/services/auth/auth.types";
import { useGuestCartStore } from "@/stores/guest.store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

export function useAuthForm(isLogin: boolean, form: UseFormReturn<IFormData>) {
    const { register, handleSubmit, reset } = useForm<IFormData>();

    const { clearCart } = useGuestCartStore();

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: IFormData) => authService.main("login", data, recaptchaRef.current?.getValue()),
        onSuccess() {
            startTransition(() => {
                form.reset();
                clearCart();
                router.push(PUBLIC_PAGES.HOME);
            });
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            }
        },
    });

    const guestItems = useGuestCartStore((s) => s.items);

    const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: (data: IFormData) => authService.main("register", data, recaptchaRef.current?.getValue(), guestItems),
        onSuccess() {
            startTransition(() => {
                form.reset();
                router.push(PUBLIC_PAGES.HOME);
            });
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            }
        },
    });

    const onSubmit: SubmitHandler<IFormData> = (data) => {
        const token = recaptchaRef.current?.getValue();

        if (!token) {
            toast.error("Please complete the captcha");
            return;
        }

        if (isLogin) {
            mutateLogin(data);
        } else {
            mutateRegister(data);
        }
    };

    const isLoading = isPending || isLoginPending || isRegisterPending;

    return {
        register,
        handleSubmit,
        onSubmit,
        recaptchaRef,
        isLoading,
    };
}
