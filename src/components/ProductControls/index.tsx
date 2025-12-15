"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import { Heart, MinusIcon, PlusIcon, ShoppingBasket } from "lucide-react";
import { useState } from "react";

interface ProductControlsProps {
    className?: string;
}

export default function ProductControls(props: ProductControlsProps) {
    const { className } = props;
    const [quantity1, setQuantity1] = useState(1);

    return (
        <div className={cn("flex w-full gap-1", className)}>
            <Button
                size="lg"
                className="flex-2"
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <ShoppingBasket className="size-5" /> <span className="hidden xs:inline">В корзину</span>
            </Button>

            <ButtonGroup
                onClick={(e) => {
                    e.preventDefault();
                }}
                className="flex-1 text-center hidden 2xl:flex"
            >
                <Button disabled={quantity1 === 0} onClick={() => setQuantity1(Math.max(0, quantity1 - 1))} size="lg" variant="outline" className="px-1!">
                    <MinusIcon />
                </Button>
                <ButtonGroupText className="px-1! w-[40px] tabular-nums justify-center">{quantity1}</ButtonGroupText>
                <Button onClick={() => setQuantity1(quantity1 + 1)} size="lg" variant="outline" className="px-1!">
                    <PlusIcon />
                </Button>
            </ButtonGroup>
        </div>
    );
}

{
    /* <Button
    variant="outline"
    size="icon"
    onClick={(e) => {
        e.preventDefault();
    }}
>
    <Heart className="size-5" />
    <span className="sr-only">Избранное</span>
</Button> */
}
