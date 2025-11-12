import HomeID from "@/components/pages/HomeID";

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return {
        title: `Пост ${id}`,
    };
}

export default function HomeIDPage() {
    return <HomeID />;
}
