"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { QuantityButton } from "@/components/ui/buttons/QuantityButton";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@reactuses/core";
import { Heart, MinusIcon, PlusIcon, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
///! когда скрыт сетчик а до этого мы изменили его, то добавляется занчение из четчика а не 1
interface ProductCardControlsProps {
    className?: string;
    handleAddToCart: (val: number) => void;
    hiddenQuantityControls?: boolean;
    quantityClassName?: string;
    maxValue: number;
}

export default function ProductCardControls(props: ProductCardControlsProps) {
    const { className, handleAddToCart, hiddenQuantityControls = false, quantityClassName, maxValue } = props;
    const isWide = useMediaQuery("(min-width: 1440px)");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!hiddenQuantityControls || isWide) {
            setQuantity(1);
        }
    }, [hiddenQuantityControls, isWide]);

    const changeQuantityIncrement = () => {
        if (quantity < maxValue) {
            setQuantity(Math.max(0, quantity + 1));
        }
    };

    const changeQuantityDecrement = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    return (
        <div className={cn("flex w-full gap-1", className)}>
            <Button
                size="lg"
                className="flex-2"
                onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(quantity);
                }}
            >
                <ShoppingBasket className="size-5" /> <span className="hidden xs:inline">В корзину</span>
            </Button>

            {!hiddenQuantityControls && (
                <QuantityButton value={quantity} changePlus={changeQuantityIncrement} changeMinus={changeQuantityDecrement} className={quantityClassName ?? "hidden 2xl:flex"} />
            )}
        </div>
    );
}
