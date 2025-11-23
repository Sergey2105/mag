import SortPopup from "@/components/SortPopup";

export default function TopBar(props: any) {
    const { className } = props;
    return (
        <div className="flex justify-between">
            <div className="flex gap-1.5 items-center">
                <p className="text-[16px] font-medium leading-4 text-[#6C6C6C]">
                    Selected Products: <span className="text-[16px] font-medium leading-4 text-black">85</span>
                </p>
            </div>
            <SortPopup />
        </div>
    );
}
