import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlickImageSlider = ({ data }) => {
    const settings = {
        className: 'center',
        centerMode: 'true',
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        centerPadding: '0',
        focusOnSelect: true,
        pauseOnHover: false,
        arrows: false,
    };
    return (
        <div className='container flex justify-center'>
            <div className='md:w-1/3 w-2/3'>
                <Slider {...settings}>
                    {data.map((dataItem) => (
                        <div key={dataItem.id} className='md:py-7 py-5'>
                            <img className='h-full w-full object-cover rounded-full' src={dataItem.bannerimage} alt="testimonial image" />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default SlickImageSlider;
