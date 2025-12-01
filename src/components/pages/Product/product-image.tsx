"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import styles from "./index.module.scss";

export default function ProductImage(props: any) {
    const { imageURL, name, className } = props;

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
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={imageURL} alt={name} width={600} height={600} objectFit="contain" className="object-center" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
