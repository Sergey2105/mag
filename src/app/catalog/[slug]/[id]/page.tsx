import Product from "@/components/pages/Product";

interface Props {
    params: { slug: string };
}

export default async function CatalogProductPage({ params }: Props) {
    const { slug } = await params;
    console.log(slug);

    return <Product />;
}
