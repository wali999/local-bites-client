import React from 'react';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import TopReviews from '../components/TopReviews/TopReviews';

const Home = () => {
    return (
        <div>
            {/* Hero Slider */}
            <HeroSlider></HeroSlider>

            {/* Top Reviews */}
            <TopReviews></TopReviews>
        </div>
    );
};

export default Home;