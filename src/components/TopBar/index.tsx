import SortPopup from "@/components/SortPopup";

export default function TopBar(props: any) {
    const { className, count } = props;
    return (
        <div className="flex justify-between">
            <div className="flex gap-1.5 items-center">
                <p className="text-[16px] font-medium leading-4 text-[#6C6C6C]">
                    Товаров: <span className="text-[16px] font-medium leading-4 text-black">{count}</span>
                </p>
            </div>
            <SortPopup />
        </div>
    );
}
