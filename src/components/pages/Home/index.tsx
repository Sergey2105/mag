"use client";
import DialogURL from "@/components/ui/DialogURL";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { postServices } from "@/services/post.services";
import { PAGES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function Home() {
    const t = useTranslations("Home");
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data, isLoading, isFetching, isSuccess, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: () => postServices.getPosts(),
        select: (data) => data.data,
    });

    if (isLoading || isFetching) return <Loader size="md" fullScreen={true} />;
    if (isError) return <p>Ошибка при загрузке</p>;

    return (
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">{t("title")}</h1>
            <DialogURL url="dialog" btn="Открыть" title="Диалог">
                <p>Этот диалог останется открытым даже при обновлении страницы.</p>
            </DialogURL>

            <div className="grid grid-cols-5 gap-2">
                {data?.length &&
                    data?.map((el) => (
                        <DialogURL key={el.id} url={`dialog-${el.id}`} btn={`Открыть ${el.id}`} title={el.title}>
                            {el.body}
                        </DialogURL>
                    ))}
            </div>

            <Button
                variant="outline"
                onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["posts"] });
                }}
            >
                revalidate
            </Button>
            {/* 
            <div className="mt-4">
                {data?.length &&
                    data?.map((el) => (
                        <Button variant="outline" onClick={() => router.push(PAGES.HOME.BY_ID(el.id))} key={el.id}>
                            {el.id}
                        </Button>
                    ))}
            </div> */}
        </div>
    );
}
