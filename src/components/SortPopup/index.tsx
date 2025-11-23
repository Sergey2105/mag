import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

export default function SortPopup(props: any) {
    const { className } = props;
    return (
        <div className={cn("inline-flex items-center justify-between bg-gray-50 px-4 h-10 w-[256px] rounded-xl border border-[#D4D4D4] cursor-pointer", className)}>
            <span>По популярности</span>
            <ArrowUpDown size={16} />
        </div>
    );
}
