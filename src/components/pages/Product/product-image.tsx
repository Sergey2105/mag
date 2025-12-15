"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

interface ProductImageProps {
    images: string[];
    name: string;
    className?: string;
}

export default function ProductImage(props: ProductImageProps) {
    const { images, name, className } = props;

    console.log(images);

    return (
        <div className={cn("h-full w-full", className)}>
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={30}
                mousewheel={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                className="mySwiper h-full"
            >
                {images &&
                    images.map((el, i) => (
                        <SwiperSlide>
                            <Image src={el} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
