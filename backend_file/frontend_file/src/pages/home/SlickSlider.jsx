import React,{useState,useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const SlickSlider = ({ data }) => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        arrows: false,
    };
    return (
        <div className='container flex flex-col items-center'>
            <img className='my-4' src="/src/assets/images/quote.png" alt="quote" />
            <div className='md:w-2/3 w-full'>
                <Slider {...settings}>
                    {data.map((dataItem) => (
                        <div key={dataItem.id} className='custom-flex flex-col items-center'>
                            <h3 className='sm:text-2xl text-xl font-bold'>{dataItem.name}</h3>
                            <i className='my-1 sm:text-base text-xs'>{dataItem.caption}</i>
                            <p className='text-center sm:text-lg text-sm'dangerouslySetInnerHTML={{__html:dataItem.short_desc}}></p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default SlickSlider;
