import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Banner = () => {
    const [banner, setBanner] = useState([]);

    const bannerData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newBanner=[...response.data]
            newBanner=newBanner.reverse()
            const sliderDatas = newBanner.filter(
                (item) => item.status === "Publish" && item.page_type === "Home/Slider"
            );
            setBanner(sliderDatas);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        bannerData();
    }, []);
    // const images = BannerData;
    const options = {
        items: 3,
        loop: true,
        autoplay: true,
        dots: false,
        autoplayTimeout: 6000,
        responsive: {
            0: {
                items: 1
            },
        }
    };
    return (
        <>
            <section className='relative lg:py-[120px] md:py-[90px] sm:py-[70px] py-[50px]'>
                <div className='absolute w-full h-full top-0 left-0'>
                    <OwlCarousel className="owl-theme h-full" key={banner.length} {...options}>
                        {banner.map((imageItem, index) => (
                                <div className="item relative" key={index}>
                                    <img className='w-full h-full' src={imageItem.slider_image} alt={imageItem.name} />
                                    <div className='absolute inset-0 flex justify-center items-center h-[50%]'>
                                        <h3 className='md:text-2xl sm:text-xl text-lg font-bold'>{imageItem.name}</h3>
                                    </div>
                                    <div className="bg-gradient-to-t from-black to-transparent opacity-60 absolute w-full z-10 h-full top-0 left-0"></div>
                                    <div className="container absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center text-center">
                                        <h1 className='text-white font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl mb-2'>{imageItem.caption}</h1>
                                        <h2 className='text-white font-semibold md:text-3xl sm:text-xl text-lg'>{imageItem.title}</h2>
                                    </div>
                                </div>
                        ))}
                    </OwlCarousel>
                </div>
                <div className='container relative z-20 inset-0 w-full h-full flex flex-col items-center justify-center text-center'>
                <NavLink to="/Apply" className='block w-auto text-white py-2 px-3 mt-40 rounded bg-red-600 border border-red-600 transition-all duration-200 ease-linear hover:bg-white hover:text-gray-700'>Apply Now</NavLink>
                </div>
            </section>
        </>
    )
}

export default Banner;
