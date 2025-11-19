"use client";
import DialogURL from "@/components/ui/DialogURL";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { postServices } from "@/services/post.services";
import Loader from "@/components/Loader";

export default function HomeID() {
    const t = useTranslations("Home");

    const params = useParams();
    const id = params?.id;

    console.log(params.id);

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => postServices.getPostByID(Number(id)),
        select: (data) => data.data,
        enabled: !!id,
    });

    const queryClient = useQueryClient();

    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log("isSuccess");
    //     }
    // }, [isSuccess, data]);

    // useEffect(() => {
    //     if (isError) {
    //         console.log("isError");
    //     }
    // }, [isError]);

    if (isLoading) return <Loader size="md" fullScreen={true} />;
    if (isError) return <p>Ошибка при загрузке</p>;

    return (
        <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">{t("title")}</h1>
            <Button
                variant="outline"
                onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["post", id] });
                }}
            >
                revalidate
            </Button>
            <div>
                <p>{data?.id}</p>
                <p>{data?.userId}</p>
                <p>{data?.title}</p>
                <p>{data?.body}</p>
            </div>
        </div>
    );
}
