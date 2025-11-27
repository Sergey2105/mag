import Category from "@/components/pages/Category";
import Link from "next/link";

interface Props {
    params: {
        slug: string;
        id: string;
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug, id } = await params;

    return <Category slug={slug} />;
}
