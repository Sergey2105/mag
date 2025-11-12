import { ILoader } from "@/types/loader.interface";

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
};

export default function Loader(props: ILoader) {
    const { text, size, fullScreen = false } = props;

    const loaderContent = (
        <div className="flex flex-col items-center gap-3">
            <div className={`border-2 border-gray-200 ${sizeClasses[size]} border-t-transparent rounded-full animate-spin`} />
            {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return <div className="fixed inset-0 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">{loaderContent}</div>;
    }

    return loaderContent;
}
