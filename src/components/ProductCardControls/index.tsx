"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { QuantityButton } from "@/components/ui/buttons/QuantityButton";
import { cn } from "@/lib/utils";
import { Heart, MinusIcon, PlusIcon, ShoppingBasket } from "lucide-react";
import { useState } from "react";

interface ProductCardControlsProps {
    className?: string;
}

export default function ProductCardControls(props: ProductCardControlsProps) {
    const { className } = props;
    const [quantity, setQuantity] = useState(1);

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

            <QuantityButton value={quantity} changePlus={() => setQuantity(Math.max(0, quantity + 1))} changeMinus={() => setQuantity(quantity - 1)} className="hidden 2xl:flex" />
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
