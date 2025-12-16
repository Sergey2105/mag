"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MinusIcon, PlusIcon } from "lucide-react";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

interface QuantityButtonProps {
    value: number;
    changePlus: () => void;
    changeMinus: () => void;
    className?: string;
}

export function QuantityButton(props: QuantityButtonProps) {
    const { value, changePlus, changeMinus, className } = props;
    return (
        <div className={cn("", className)}>
            <ButtonGroup
                onClick={(e) => {
                    e.preventDefault();
                }}
                className="flex-1 text-center "
            >
                <Button disabled={value === 0} onClick={changeMinus} size="lg" variant="outline" className="px-1!">
                    <MinusIcon />
                </Button>
                <ButtonGroupText className="px-1! w-10 tabular-nums justify-center">{value}</ButtonGroupText>
                <Button onClick={changePlus} size="lg" variant="outline" className="px-1!">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}
