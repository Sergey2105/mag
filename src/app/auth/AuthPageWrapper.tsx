import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export function AuthPageWrapper({ children }: Props) {
    return <div className="flex items-center justify-center">{children}</div>;
}
