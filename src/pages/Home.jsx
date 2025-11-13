import React, { useRef } from 'react';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import TopReviews from '../components/TopReviews/TopReviews';
import About from '../components/About/About';
import TopRestaurants from '../components/TopRestaurants/TopRestaurants';

const Home = () => {
    const topReviewsRef = useRef(null);

    return (
        <div>
            {/* Hero Slider */}
            <HeroSlider scrollToTopReviews={() => topReviewsRef.current?.scrollIntoView({ behavior: 'smooth' })}></HeroSlider>

            {/* Top Reviews */}
            <div ref={topReviewsRef}>
                <TopReviews />
            </div>

            {/* Tp Restaurents */}
            <TopRestaurants></TopRestaurants>

            {/* About */}
            <About></About>
        </div>
    );
};

export default Home;