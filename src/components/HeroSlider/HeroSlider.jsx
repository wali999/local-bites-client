import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useLoaderData } from "react-router";

const HeroSlider = ({ scrollToTopReviews }) => {
    const slides = useLoaderData();

    return (
        <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                effect="fade"
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 text-white">
                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
                                >
                                    {slide.title}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="text-lg md:text-2xl mt-4 max-w-2xl"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="mt-6"
                                >
                                    <button onClick={scrollToTopReviews} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:shadow-lg">
                                        Explore Now
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;
