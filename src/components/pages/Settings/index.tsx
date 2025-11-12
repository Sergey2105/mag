"use client";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import DialogURL from "@/components/ui/DialogURL";
import Wrapper from "@/components/ui/wrapper";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IPost } from "@/types/post.interface";

export default function Settings() {
    const t = useTranslations("Settings");
    const { mutate, isPending } = useMutation({
        mutationKey: ["add post"],
        mutationFn: async (newPost: IPost) => {
            return axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
        },
        onSuccess: () => {},
        onError: (error) => {},
    });

    // const queryClient = useQueryClient();

    // if (isPending) return <p>Загрузка...</p>;
    // if (isError) return <p>Ошибка при загрузке</p>;

    return (
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">{t("title")}</h1>
            <Button
                variant="outline"
                onClick={() => {
                    mutate({
                        userId: 1,
                        id: Math.floor(Math.random() * 1000),
                        title: "New Post",
                        body: "This is a new post",
                    });
                }}
            >
                {isPending ? "Adding..." : "Add Post"}
            </Button>
        </div>
    );
}
