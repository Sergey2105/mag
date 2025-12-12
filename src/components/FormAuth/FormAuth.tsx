"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PasswordField from "@/components/PasswordField";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Social from "@/components/FormAuth/Social";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import Link from "next/link";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormAuth {
    className?: string;
}

export default function FormAuth(props: FormAuth) {
    const { className } = props;
    const router = useRouter();
    const t = useTranslations("Form");

    const schema = z.object({
        email: z.string().email(t("invalidEmail")),
        password: z.string().min(6, t("passwordMin")),
    });

    type FormFields = z.infer<typeof schema>;

    const form = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: FormFields) => authService.main("login", data),
        onSuccess() {
            form.reset();
            router.replace("/profile");
        },
        onError(error) {
            let message = "Произошла ошибка";

            if (error instanceof AxiosError) {
                message = error.response?.data?.message || message;
            }

            form.setError("root", { message });
        },
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(data);
    };

    useEffect(() => {
        const subscription = form.watch(() => {
            form.clearErrors("root");
        });

        return () => subscription.unsubscribe();
    }, [form.watch, form.clearErrors]);

    return (
        <div className={cn("max-w-md mx-auto", className)}>
            <Card>
                <CardHeader>
                    <CardTitle>Войти в личный кабинет</CardTitle>
                    <CardDescription>Введите email и пароль для входа</CardDescription>
                    <CardAction>
                        <Button variant="link" asChild>
                            <Link href="/register">Регистрация</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4" id="form-rhf-demo">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("email")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="funkoshop@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("password")}</FormLabel>
                                        <FormControl>
                                            <PasswordField field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root?.message && <FormMessage id="form-rhf-demo">{form.formState.errors.root.message}</FormMessage>}
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 w-full">
                    <Button type="submit" className="w-full" form="form-rhf-demo" disabled={isPending}>
                        {isPending && <LoaderCircleIcon className="animate-spin" />}
                        Войти
                    </Button>

                    <div className="before:bg-border after:bg-border flex items-center gap-4 before:h-px before:flex-1 after:h-px after:flex-1 w-full">
                        <span className="text-muted-foreground text-xs">или</span>
                    </div>

                    <Social className="flex gap-2 flex-col w-full" />
                </CardFooter>
            </Card>
        </div>
    );
}
