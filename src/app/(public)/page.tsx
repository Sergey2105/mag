import Home from "@/components/pages/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Главная",
    description: "Главная страница",
};

export default function HomePage() {
    return <Home />;
}
