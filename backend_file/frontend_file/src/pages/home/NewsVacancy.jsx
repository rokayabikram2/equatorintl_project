import React, { useState, useEffect } from 'react';
// import Data from '../newspaper-vacancy/NewsVacancyData';
import { NavLink } from 'react-router-dom';
import NewspaperModal from '../newspaper-vacancy/NewspaperModal';
import axios from 'axios';
import ModalImage from "react-modal-image";


const NewsVacancy = () => {
   
    const [vSlider, setSlider] = useState([]);
    const [vacancy, setVacany] = useState([]);


    const vacancyData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            let newVacancy = [...response.data]
            newVacancy = newVacancy.reverse()
            const vacancyDatas = newVacancy.filter(
                (item) => item.status === "Publish" && item.page_type === "Newspaper Vacancy"
            );
            setVacany(vacancyDatas.slice(0, 3));

            const SliderDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "NewspaperVacancy/Slider"
            );
            setSlider(SliderDatas[0]);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        vacancyData();
    }, []);
    const image = vacancy.length > 0 ? vacancy[0] : ''

    // console.log(vacancy);
    return (
        <section className='py-12'>
            <div className="container flex flex-col items-center">
                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-8 relative after:absolute after:w-[100%] after:h-[5px] after:bg-red-600 after:content-[''] after:bottom-[-8px] after:rounded-sm after:left-0 before:absolute before:bg-white before:content-[''] before:h-[5px] before:w-[5px] before:bottom-[-8px] before:z-10 animate"
                    data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{vSlider.title}</h2>
                <div className='md:grid md:grid-cols-3 gap-5 hidden w-full'>
                    {vacancy.map((image, index) => (
                        <NewspaperModal key={image.id} imageUrl={image.bannerimage} images={vacancy} index={index} publishedDate={image.published_date} interviewDate={image.interview_date} />
                    ))}
                </div>
                <div className='md:hidden block'>

                    <ModalImage
                        small={image.bannerimage}  
                        large={image.bannerimage}
                        alt="image"
                    />
                </div>
                <NavLink to="/NewspaperVacancy" className='block w-auto text-white py-2 px-3 mt-5 rounded bg-red-600 border border-red-600 transition-all duration-200 ease-linear hover:bg-white hover:text-gray-700'>View All</NavLink>
            </div>
        </section>
    )
}

export default NewsVacancy;
