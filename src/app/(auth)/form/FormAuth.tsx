"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PasswordField from "@/components/inputs/PasswordField";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthForm } from "@/app/(auth)/form/useAuthForm";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthToggle } from "@/app/(auth)/form/AuthToggle";
import { SocialMediaButtons } from "@/app/(auth)/form/socials/SocialMediaButtons";
import { useTheme } from "next-themes";
import { Field } from "@/components/ui/field";

interface FormAuth {
    className?: string;
    isLogin: boolean;
}

export default function FormAuth(props: FormAuth) {
    const { className, isLogin } = props;
    const { theme, systemTheme } = useTheme();

    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");

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

    const { handleSubmit, isLoading, onSubmit, recaptchaRef, register } = useAuthForm(isLogin, form);

    return (
        <div className={cn("max-w-md mx-auto", className)}>
            <Card>
                <CardHeader>
                    <CardTitle>{isLogin ? "Вход" : "Регистрация"}</CardTitle>
                    <CardDescription>{isLogin ? "Введите данные для входа" : "Заполните форму для создания аккаунта"}</CardDescription>
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
                            <div className="flex justify-center">
                                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 w-full">
                    <Field>
                        <Button type="submit" className="w-full" form="form-rhf-demo" disabled={isLoading}>
                            {isLoading ? <LoaderCircleIcon className="animate-spin" /> : isLogin ? "Вход" : "Регистрация"}
                        </Button>

                        <div className="before:bg-border after:bg-border flex items-center gap-4 before:h-px before:flex-1 after:h-px after:flex-1 w-full">
                            <span className="text-muted-foreground text-xs">или</span>
                        </div>

                        <SocialMediaButtons />

                        <AuthToggle isLogin={isLogin} />
                    </Field>
                </CardFooter>
            </Card>
        </div>
    );
}
