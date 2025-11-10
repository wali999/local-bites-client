import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLoaderData } from "react-router";

const HeroSlider = () => {

    const slides = useLoaderData();

    return (
        <div className="w-full h-[50vh] relative mb-8">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full "
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-[50vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="bg-black/50 w-full h-full flex flex-col justify-center items-center">
                                <h2 className="text-3xl md:text-5xl font-bold mb-2">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl">{slide.subtitle}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


export default HeroSlider;