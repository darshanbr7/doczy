import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfoPage from "../../images/InfoPage.jpg";

const Home = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100'>
            <div className='flex justify-center mb-10'>
                <h2 className="text-xl font-semibold overflow-hidden whitespace-nowrap border-r-4 border-solid pr-2 animate-typing ">
                Trusted doctors, right at your fingertips. Fast and reliable medical care when you need it most.
                </h2>
            </div>

            <div className='flex justify-center w-1/3 max-w-4xl'>
                <div className="slider-container w-full">
                    <Slider {...settings}>
                        <div className="flex justify-center">
                            <img
                                src={InfoPage}
                                alt="Slide 1"
                                className="slider-image w-full h-auto rounded-sm"
                            />
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={InfoPage}
                                alt="Slide 2"
                                className="slider-image w-full h-auto rounded-sm"
                            />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default Home;
