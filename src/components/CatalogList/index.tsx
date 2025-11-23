"use client";
import CatalogItem from "@/components/CtalogItem";
import { Title } from "@/components/ui/title";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CatalogList(props: any) {
    const { list } = props;
    return (
        <>
            {list.map((cat: any) => (
                <CatalogItem key={cat.id} name={cat.name} imageURL={cat.imageURL} />
            ))}
        </>
    );
}
