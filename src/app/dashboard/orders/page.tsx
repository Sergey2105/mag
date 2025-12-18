import type { Metadata } from "next";
import { Orders } from "./Orders";

export const metadata: Metadata = {
    title: "My orders",
};

export default async function OrdersPage() {
    return <Orders />;
}
