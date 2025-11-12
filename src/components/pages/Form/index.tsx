"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import PasswordField from "@/components/PasswordField";
import axios from "axios";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormRegister() {
    const t = useTranslations("Form");

    const schema = z.object({
        email: z.string().email(t("invalidEmail")),
        password: z.string().min(8, t("passwordMin")),
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

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const res = await axios.post("", {
                email: data.email,
                password: data.password,
            });
        } catch (error: any) {
            const message = error.response?.data?.error || "Something went wrong";
            form.setError("root", { message });
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("email")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="test@email.com" {...field} />
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
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button type="submit">{t("Submit")}</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
